import axiosBase from 'axios';
import qs from 'qs';
import type { ApiRes, ErrorRes } from './axios.types';

/** 임의로 추가 **/
export class ApiError {
  message: string;
  code: number;
  title?: string;

  constructor(err: ErrorRes) {
    this.message = err.message || '예상하지 못한 오류가 발생했어요';
    this.code = err.code ?? err.status;
    this.title = err.title;
  }
}

const axios = axiosBase.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

axios.interceptors.response.use(
  ({ data: response }: { data: ApiRes<any> }) => {
    /** 사전 정의된 api 에러 */
    if (response.data.code < 0) {
      throw new ApiError(response.data);
    }

    return response.data.data;
  },
  ({ response = {} }) => {
    return Promise.reject(new ApiError(response));
  }
);

export default axios;
