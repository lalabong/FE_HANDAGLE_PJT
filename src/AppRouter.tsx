import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { PATH } from '@/constants/path';
import MainLayout from '@/layouts/MainLayout';
import CreatePostPage from '@/pages/CreatePostPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PostDetailPage from '@/pages/PostDetailPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '',
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: PATH.DETAIL_POST(':postId'),
          element: (
            <ProtectedRoute>
              <PostDetailPage />
            </ProtectedRoute>
          ),
        },
        {
          path: PATH.CREATE_POST,
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
