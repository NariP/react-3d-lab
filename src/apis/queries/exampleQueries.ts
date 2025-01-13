import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getExampleAPI } from '@/apis/example';

const exampleQueries = createQueryKeys('example', {
  cartCount: {
    queryKey: [''],
    queryFn: getExampleAPI,
  },
});

export default exampleQueries;
