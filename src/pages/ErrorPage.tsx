import { useRouteError } from 'react-router-dom';
import { ApiError } from '@/libs/axios/axios';

const ErrorPage = () => {
  const error = useRouteError() as Error | ApiError;
  const isApiError = error instanceof ApiError;
  console.log(isApiError);

  return <div>ErrorPage</div>;
};

export default ErrorPage;
