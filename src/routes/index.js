import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '@/SharedModule/components/AuthLayout/AuthLayout';
import MasterLayout from '@/SharedModule/components/MasterLayout/MasterLayout';
import ProtectedRoute from '@/SharedModule/components/ProtectedRout/ProtectedRout';
import Notfound from '@/SharedModule/components/Notfound/Notfound';
import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Notfound />,
    children: publicRoutes,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
    errorElement: <Notfound />,
    children: protectedRoutes,
  },
  {
    path: '*',
    element: <Notfound />,
  },
]);
