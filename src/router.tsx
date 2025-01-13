import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ].map(r => ({ ...r, errorElement: <ErrorPage /> }))
);

export default router;
