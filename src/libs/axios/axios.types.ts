/** 임의로 추가 **/
export interface ErrorRes {
  code: number;
  message: string;
  title?: string;
  status?: number;
}

export interface ApiRes<T> {
  data: {
    code: number;
    message: string;
    data: T;
  };
}
