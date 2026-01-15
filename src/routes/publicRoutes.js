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
  { path: ROUTES.PUBLIC.LOGIN, element: <Login /> },
  { path: ROUTES.PUBLIC.REGISTER, element: <Register /> },
  { path: ROUTES.PUBLIC.FORGOT_PASS, element: <ForgotPass /> },
  { path: ROUTES.PUBLIC.VERIFY_ACCOUNT, element: <VerifyAccountUser /> },
  { path: ROUTES.PUBLIC.RESET_PASS, element: <ResetPass /> },
];
