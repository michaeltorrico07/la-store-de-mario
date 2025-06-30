import { useApi, type UseApiResult, type UseApiOptions } from "../../shared"
import { useRef } from "react"

export const useGetInitPoint = (): UseApiResult<string> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: 'POST',
      url: '/payment '
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<string>(paramsRef)

  return { data, loading, error, cancel, handleCall, onSubmit }
}