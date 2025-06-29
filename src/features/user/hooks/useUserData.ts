import { useRef } from 'react';
import type { NameSchema } from '../schemas/personalDataSchema';
import { useApi, type UseApiOptions } from '../../shared';

export const useUserData = (userData: NameSchema | null) => {

  const paramsRef = useRef({
    url: '/user',
    method: 'PUT',
    body: {
      ...userData
    }
  })

  const { data, error, fetch } = useApi<NameSchema>({ params: paramsRef.current, autoFetch: false } as UseApiOptions);

  return { data, error, fetch }
}