import { lazy } from 'react';
import { ROUTES } from '@/config/constants';

const Home = lazy(() => import('@/HomeModule/components/Home/Home'));
const RecipesList = lazy(() =>
  import('@/RecipesModule/components/RecipesList/RecipesList')
);
const AddAndUpdateRecipe = lazy(() =>
  import('@/RecipesModule/components/AddRecipe/AddAndUpdateRecipe')
);
const CategoriesList = lazy(() =>
  import('@/categoriesModule/components/CategoriesList/CategoriesList')
);
const FavoriteList = lazy(() =>
  import('@/UserModule/components/FavoriteList/FavoriteList')
);
const UserList = lazy(() => import('@/UserModule/components/UserList/UserList'));

export const protectedRoutes = [
  { index: true, element: <Home /> },
  { path: ROUTES.PROTECTED.RECIPES, element: <RecipesList /> },
  { path: ROUTES.PROTECTED.ADD_RECIPE, element: <AddAndUpdateRecipe /> },
  { path: ROUTES.PROTECTED.CATEGORIES, element: <CategoriesList /> },
  { path: ROUTES.PROTECTED.FAVORITES, element: <FavoriteList /> },
  { path: ROUTES.PROTECTED.USERS, element: <UserList /> },
];
