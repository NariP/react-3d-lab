import axios from '@/libs/axios';

/** API */
export const getExampleAPI = () => axios.get<unknown, { count: number }>('/cart-count');
