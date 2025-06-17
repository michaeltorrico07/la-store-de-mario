import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../../../infrastructure/services'

type Data<T> = T | null

type CustomError = Error | null

interface UseApiOptions {
  autoFetch: true
  params: ApiCallOptions
}

interface ApiCallOptions {
  method: Method
  url: string
  query?: Record<string, unknown>
  pathParam?: string
  body?: Record<string, unknown>
}

interface UseApiCall<T> {
  call: Promise<AxiosResponse<T>>
  controller: AbortController
}

interface UseApiResult<T> {
  loading: boolean
  data: Data<T>
  error: CustomError
  fetch: (param: ApiCallOptions) => void
  cancel: () => void
}

interface ApiResponse<T> {
  success: boolean
  data: T
  error: unknown
}

export const useApi = <T> (options: UseApiOptions): UseApiResult<T> => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data<T>>(null)
  const [error, setError] = useState<CustomError>(null)
  const abortControllerRef = useRef<(AbortController | null)>(null)

  const fetch = useCallback((param: ApiCallOptions)=> {
    setLoading(true)
    setData(null)
    setError(null)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const { call, controller } = apiCall<ApiResponse<T>>(param)
    abortControllerRef.current = controller
    call.then((response) => {
      if (!controller.signal.aborted) {
        setData(response.data.data)
        console.log(response.data)
      }
      setError(null)
    }).catch((err) => {
      setError(err)
    }).finally(() => {
      setLoading(false)
    })

    return () => controller.abort()
  }, [])

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (options?.autoFetch) {
      return fetch(options.params)
    }
    return () => cancel()
  }, [cancel, fetch, options?.autoFetch, options.params])
  return { loading, data, error, fetch, cancel }
}

const apiCall = <T>({ method, url, pathParam, query, body}: ApiCallOptions): UseApiCall<T> => {
  const controller = new AbortController()
  const fulUrl = pathParam? `${url.replace(/\/$/, '')}/${pathParam}` : url
  const config: AxiosRequestConfig = { 
    method, 
    url: 
    fulUrl, 
    params: query, 
    data: body,
    signal: controller.signal
  }
  const call = api.request<T>(config)
  return { call, controller }
}