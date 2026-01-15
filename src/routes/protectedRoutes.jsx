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
const AdvancedSearch = lazy(() =>
  import('@/RecipesModule/components/AdvancedSearch/AdvancedSearch')
);
const MealPlanner = lazy(() =>
  import('@/HomeModule/components/MealPlanner/MealPlanner')
);
const UserDashboard = lazy(() =>
  import('@/UserModule/components/UserDashboard/UserDashboard')
);

export const protectedRoutes = [
  { index: true, element: <Home /> },
  { path: 'RecipesList', element: <RecipesList /> },
  { path: 'AddAndUpdateRecipe/:id', element: <AddAndUpdateRecipe /> },
  { path: 'CategoriesList', element: <CategoriesList /> },
  { path: 'FavoriteList', element: <FavoriteList /> },
  { path: 'UserList', element: <UserList /> },
  { path: 'search', element: <AdvancedSearch /> },
  { path: 'meal-planner', element: <MealPlanner /> },
  { path: 'dashboard', element: <UserDashboard /> },
];
