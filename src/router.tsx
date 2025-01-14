import { createBrowserRouter } from 'react-router-dom';
import MenuLayout from '@/components/MenuLayout';
import Chapter1Page from '@/pages/Chapter1Page';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <MenuLayout>
          <HomePage />
        </MenuLayout>
      ),
    },
    {
      path: '/chapter-1',
      element: (
        <MenuLayout>
          <Chapter1Page />
        </MenuLayout>
      ),
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ].map(r => ({ ...r, errorElement: <ErrorPage /> }))
);

export default router;
