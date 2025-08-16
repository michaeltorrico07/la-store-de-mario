import { useRef } from 'react';
import type { NameSchema } from '../schemas/personalDataSchema';
import { useApi, type UseApiOptions } from '../../shared';

export const useUserData = () => {

  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      url: '/user',
      method: 'PUT'
    }
  })

  const { data, error, onSubmit, loading } = useApi<NameSchema>(paramsRef);

  return { data, error, onSubmit, loading }
}