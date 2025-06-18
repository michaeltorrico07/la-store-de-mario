import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method, AxiosHeaders } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../../../infrastructure/services'

type Data<T> = T | null

type CustomError = Error | null

export interface UseApiOptions {
  autoFetch: boolean
  params: ApiCallOptions
}

export interface ApiCallOptions {
  method: Method
  url: string
  query?: Record<string, unknown>
  pathParam?: string
  body?: Record<string, unknown>
  headers?: AxiosHeaders
}

interface UseApiCall<T> {
  call: Promise<AxiosResponse<T>>
  controller: AbortController
}

export interface UseApiResult<T> {
  loading: boolean
  data: Data<T>
  error: CustomError
  cancel: () => void
  handleCall: () => void
}

export interface ApiResponse<T> {
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
      }
      setError(null)
    }).catch((err: AxiosError) => {
      if (err.code == "ERR_CANCELED") return      
      setError(err)
      console.log(err)
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

  const handleCall = () => {
    fetch(options.params)
  }
  return { loading, data, error, cancel, handleCall }
}

const apiCall = <T>({ method, url, pathParam, query, body, headers}: ApiCallOptions): UseApiCall<T> => {
  const controller = new AbortController()
  const fulUrl = pathParam? `${url.replace(/\/$/, '')}/${pathParam}` : url
  const config: AxiosRequestConfig = { 
    method, 
    url: 
    fulUrl, 
    params: query, 
    data: body,
    signal: controller.signal,
    headers: headers
  }
  const call = api.request<T>(config)
  return { call, controller }
}