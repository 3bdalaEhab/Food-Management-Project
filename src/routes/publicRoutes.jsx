import { lazy } from 'react';
import { ROUTES } from '@/config/constants';

const Login = lazy(() => import('@/AuthModule/components/Login/Login'));
const Register = lazy(() => import('@/AuthModule/components/Register/Register'));
const ForgotPass = lazy(() => import('@/AuthModule/components/ForgotPass/ForgotPass'));
const ResetPass = lazy(() => import('@/AuthModule/components/ResetPass/ResetPass'));
const VerifyAccountUser = lazy(() =>
  import('@/AuthModule/components/VerifyAccountUser/VerifyAccountUser')
);

export const publicRoutes = [
  { index: true, element: <Login /> },
  { path: 'Login', element: <Login /> },
  { path: 'Register', element: <Register /> },
  { path: 'ForgotPass', element: <ForgotPass /> },
  { path: 'VerifyAccountUser', element: <VerifyAccountUser /> },
  { path: 'ResetPass', element: <ResetPass /> },
];
