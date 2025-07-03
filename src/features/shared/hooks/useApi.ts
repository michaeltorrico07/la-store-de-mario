import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method, AxiosHeaders } from 'axios'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { api } from '../../../infrastructure/services'

type Data<T> = T | null

type CustomError = Error | null

interface Body {
  id?: string
  [key: string]: unknown
}

export interface UseApiOptions {
  autoFetch: boolean
  params: ApiCallOptions
}

export interface ApiCallOptions{
  method: Method
  url: string
  query?: Record<string, unknown>
  pathParam?: string
  body?: Body
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
  onSubmit:(formData: Body) => void
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  error: unknown
}

export const useApi = <T> (optionsRef: RefObject<UseApiOptions>): UseApiResult<T> => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data<T>>(null)
  const [error, setError] = useState<CustomError>(null)
  const abortControllerRef = useRef<(AbortController | null)>(null)

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setLoading(false)
  }, [])

  const fetch = useCallback((param: ApiCallOptions)=> {
    cancel()
    setLoading(true)
    setData(null)
    setError(null)

    const { call, controller } = apiCall<ApiResponse<T>>(param)
    abortControllerRef.current = controller
  
    call
      .then((response) => {
        if (!controller.signal.aborted) {
          setData(response.data.data)
          setError(null)
        }
      })
      .catch((err: AxiosError) => {
        if (err.code == "ERR_CANCELED") return      
        setError(err)
        console.log(err)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
    })
  }, [cancel])

  const handleCall = useCallback(() => {
    fetch(optionsRef.current.params)
  },[fetch, optionsRef])
  
  useEffect(() => {
    if (optionsRef.current?.autoFetch) {
      fetch(optionsRef.current.params)
    }
    return () => cancel()
  }, [cancel, fetch, optionsRef])


  const cleanObject = (obj: Record<string, unknown>) => {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      const val = obj[key]
      if (
        val !== undefined &&
        val !== null &&
        !(typeof val === "string" && val.trim() === "") &&
        !(Array.isArray(val) && val.length === 0) &&
        !(typeof val === "number" && isNaN(val))
      ) {
        newObj[key] = val
      }
    }
    return newObj
  }

  const updateParams = useCallback((newParams: Partial<ApiCallOptions>) => {
    optionsRef.current.params = {
      ...optionsRef.current.params, 
      ...newParams, 
      body: newParams.body || optionsRef.current.params.body,
      query: newParams.query || optionsRef.current.params.query,
      headers: newParams.headers || optionsRef.current.params.headers}
    handleCall()
  },[handleCall, optionsRef])

  const onSubmit = useCallback((formData: Body)=> {
  if (optionsRef.current.params.method === 'PUT') {
    const { id } = formData;
    const cleanedBody = cleanObject(formData);
    updateParams({
      body: cleanedBody,
      pathParam: id
    })
  }
  if (optionsRef.current.params.method === 'POST') {
    updateParams({
      body: formData,
    })
  }

  }, [optionsRef, updateParams])

  return { loading, data, error, cancel, handleCall, onSubmit }
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
  console.log(config)
  const call = api.request<T>(config)
  return { call, controller }
}