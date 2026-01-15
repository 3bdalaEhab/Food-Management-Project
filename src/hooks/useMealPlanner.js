import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export function useMealPlanner() {
  const [mealPlan, setMealPlan] = useLocalStorage('meal_plan', {});

  const addMealToDay = useCallback((date, mealType, recipe) => {
    const dateStr = format(new Date(date), 'yyyy-MM-dd');
    setMealPlan(prev => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        [mealType]: recipe
      }
    }));
    toast.success(`${mealType} added for ${dateStr}`);
  }, [setMealPlan]);

  const removeMealFromDay = useCallback((date, mealType) => {
    const dateStr = format(new Date(date), 'yyyy-MM-dd');
    setMealPlan(prev => {
      const updated = { ...prev };
      if (updated[dateStr]) {
        delete updated[dateStr][mealType];
        if (Object.keys(updated[dateStr]).length === 0) {
          delete updated[dateStr];
        }
      }
      return updated;
    });
    toast.success('Meal removed');
  }, [setMealPlan]);

  const getMealsForDay = useCallback((date) => {
    const dateStr = format(new Date(date), 'yyyy-MM-dd');
    return mealPlan[dateStr] || {};
  }, [mealPlan]);

  const getMealsForWeek = useCallback((startDate) => {
    const weekMeals = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = format(date, 'yyyy-MM-dd');
      weekMeals[dateStr] = mealPlan[dateStr] || {};
    }
    return weekMeals;
  }, [mealPlan]);

  const generateShoppingList = useCallback((startDate, endDate) => {
    const ingredients = {};
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateStr = format(new Date(date), 'yyyy-MM-dd');
      const dayMeals = mealPlan[dateStr] || {};

      Object.values(dayMeals).forEach(recipe => {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach(ingredient => {
            const key = ingredient.name.toLowerCase();
            if (ingredients[key]) {
              ingredients[key].quantity += ingredient.quantity || 1;
            } else {
              ingredients[key] = {
                ...ingredient,
                quantity: ingredient.quantity || 1
              };
            }
          });
        }
      });
    }

    return Object.values(ingredients);
  }, [mealPlan]);

  const clearMealPlan = useCallback(() => {
    setMealPlan({});
    toast.success('Meal plan cleared');
  }, [setMealPlan]);

  const clearDay = useCallback((date) => {
    const dateStr = format(new Date(date), 'yyyy-MM-dd');
    setMealPlan(prev => {
      const updated = { ...prev };
      delete updated[dateStr];
      return updated;
    });
    toast.success('Day cleared');
  }, [setMealPlan]);

  const getMealPlanStats = useCallback(() => {
    const stats = {
      totalDays: Object.keys(mealPlan).length,
      totalMeals: 0,
      recipes: new Set()
    };

    Object.values(mealPlan).forEach(day => {
      stats.totalMeals += Object.keys(day).length;
      Object.values(day).forEach(recipe => {
        stats.recipes.add(recipe.id);
      });
    });

    return {
      ...stats,
      uniqueRecipes: stats.recipes.size
    };
  }, [mealPlan]);

  return {
    mealPlan,
    addMealToDay,
    removeMealFromDay,
    getMealsForDay,
    getMealsForWeek,
    generateShoppingList,
    clearMealPlan,
    clearDay,
    getMealPlanStats
  };
}
