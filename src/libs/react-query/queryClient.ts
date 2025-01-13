import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { QueryClientConfig } from '@tanstack/react-query';

export const globalQueryClientConfig: QueryClientConfig = {
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.skipError) {
        return;
      }

      const errorMsg = query.meta?.errorMessage || error.message;
      if (errorMsg) {
        toast.error(errorMsg);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      if (error.message) {
        toast.error(error.message);
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: 'always',
      throwOnError: true,
      retry: false,
    },
    mutations: {
      networkMode: 'always',
      throwOnError: false,
    },
  },
};

const queryClient = new QueryClient(globalQueryClientConfig);

export default queryClient;
