import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATH } from '@constants/path';

import MainLayout from '@layouts/MainLayout';

import CreatePostPage from '@pages/CreatePostPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import PostDetailPage from '@pages/PostDetailPage';

import ProtectedRoute from '@router/ProtectedRoute';

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
          path: PATH.CREATE_AND_EDIT_POST(':postId'),
          element: (
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
