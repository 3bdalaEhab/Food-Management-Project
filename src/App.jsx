import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Container, Spinner } from 'react-bootstrap';
import AuthLayout from './SharedModule/components/AuthLayout/AuthLayout';
import MasterLayout from './SharedModule/components/MasterLayout/MasterLayout';
import Notfound from './SharedModule/components/Notfound/Notfound';
import ProtectedRout from './SharedModule/components/ProtectedRout/ProtectedRout';

// Lazy load components for better performance
const Login = lazy(() => import('./AuthModule/components/Login/Login'));
const ForgotPass = lazy(() => import('./AuthModule/components/ForgotPass/ForgotPass'));
const Register = lazy(() => import('./AuthModule/components/Register/Register'));
const ResetPass = lazy(() => import('./AuthModule/components/ResetPass/ResetPass'));
const VerifyAccountUser = lazy(() => import('./AuthModule/components/VerifyAccountUser/VerifyAccountUser'));
const Home = lazy(() => import('./HomeModule/components/Home/Home'));
const RecipesList = lazy(() => import('./RecipesModule/components/RecipesList/RecipesList'));
const AddAndUpdateRecipe = lazy(() => import('./RecipesModule/components/AddRecipe/AddAndUpdateRecipe'));
const UserList = lazy(() => import('./UserModule/components/UserList/UserList'));
const CategoriesList = lazy(() => import('./categoriesModule/components/CategoriesList/CategoriesList'));
const FavoriteList = lazy(() => import('./UserModule/components/FavoriteList/FavoriteList'));

// Loading component
const LoadingFallback = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">جاري التحميل...</span>
    </Spinner>
  </Container>
);

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Suspense fallback={<LoadingFallback />}><Login /></Suspense> },
        { path: "Login", element: <Suspense fallback={<LoadingFallback />}><Login /></Suspense> },
        { path: "ForgotPass", element: <Suspense fallback={<LoadingFallback />}><ForgotPass /></Suspense> },
        { path: "Register", element: <Suspense fallback={<LoadingFallback />}><Register /></Suspense> },
        { path: "VerifyAccountUser", element: <Suspense fallback={<LoadingFallback />}><VerifyAccountUser /></Suspense> },
        { path: "ResetPass", element: <Suspense fallback={<LoadingFallback />}><ResetPass /></Suspense> },
      ]
    },
    {
      path: "dashboard",
      element: <ProtectedRout><MasterLayout /></ProtectedRout>,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Suspense fallback={<LoadingFallback />}><Home /></Suspense> },
        { path: "RecipesList", element: <Suspense fallback={<LoadingFallback />}><RecipesList /></Suspense> },
        { path: "FavoriteList", element: <Suspense fallback={<LoadingFallback />}><FavoriteList /></Suspense> },
        { path: "UserList", element: <Suspense fallback={<LoadingFallback />}><UserList /></Suspense> },
        { path: "CategoriesList", element: <Suspense fallback={<LoadingFallback />}><CategoriesList /></Suspense> },
        { path: "AddAndUpdateRecipe/:id", element: <Suspense fallback={<LoadingFallback />}><AddAndUpdateRecipe /></Suspense> },
      ]
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={routes} />
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#28a745',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc3545',
              secondary: '#fff',
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}

export default App;
