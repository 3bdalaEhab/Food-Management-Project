import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ForgotPass from './AuthModule/components/ForgotPass/ForgotPass';
import Login from './AuthModule/components/Login/Login';
import Register from './AuthModule/components/Register/Register';
import ResetPass from './AuthModule/components/ResetPass/ResetPass';
import VerifyAccountUser from './AuthModule/components/VerifyAccountUser/VerifyAccountUser';
import Home from './HomeModule/components/Home/Home';
import AddAndUpdateRecipe from './RecipesModule/components/AddRecipe/AddAndUpdateRecipe';
import RecipesList from './RecipesModule/components/RecipesList/RecipesList';
import AuthLayout from './SharedModule/components/AuthLayout/AuthLayout';
import MasterLayout from './SharedModule/components/MasterLayout/MasterLayout';
import Notfound from './SharedModule/components/Notfound/Notfound';
import ProtectedRout from './SharedModule/components/ProtectedRout/ProtectedRout';
import UserList from './UserModule/components/UserList/UserList';
import CategoriesList from './categoriesModule/components/CategoriesList/CategoriesList';
import FavoriteList from './UserModule/components/FavoriteList/FavoriteList';

function App() {


  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: "Login", element: <Login /> },
        { path: "ForgotPass", element: <ForgotPass /> },
        { path: "Register", element: <Register /> },
        { path: "VerifyAccountUser", element: <VerifyAccountUser /> },
        { path: "ResetPass", element: <ResetPass /> },
      ]
    },
    {
      path: "dashboard",
      element: <ProtectedRout><MasterLayout /></ProtectedRout>,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
          { path: "RecipesList", element: <RecipesList /> },
          { path: "FavoriteList", element: <FavoriteList /> },
          { path: "UserList", element: <UserList /> },
          { path: "CategoriesList", element: <CategoriesList /> },
          { path: "AddAndUpdateRecipe/:id", element: <AddAndUpdateRecipe /> },
      ]
    },
  ]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
