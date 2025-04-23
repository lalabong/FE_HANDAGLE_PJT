import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import PostDetailPage from '@/pages/PostDetailPage';
import CreatePostPage from '@/pages/CreatePostPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from '@/layouts/MainLayout';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: PATH.DETAIL_POST(':postId'),
          element: <PostDetailPage />,
        },
        {
          path: PATH.CREATE_POST,
          element: <CreatePostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
