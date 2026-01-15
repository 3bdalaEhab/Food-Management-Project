import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toast from 'react-hot-toast';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('user_favorites', []);

  const addFavorite = useCallback((recipe) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === recipe.id);
      if (exists) {
        toast.info('Already in favorites');
        return prev;
      }
      toast.success('Added to favorites');
      return [...prev, recipe];
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((recipeId) => {
    setFavorites(prev => {
      const filtered = prev.filter(fav => fav.id !== recipeId);
      if (filtered.length < prev.length) {
        toast.success('Removed from favorites');
      }
      return filtered;
    });
  }, [setFavorites]);

  const toggleFavorite = useCallback((recipe) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === recipe.id);
      if (exists) {
        toast.success('Removed from favorites');
        return prev.filter(fav => fav.id !== recipe.id);
      } else {
        toast.success('Added to favorites');
        return [...prev, recipe];
      }
    });
  }, [setFavorites]);

  const isFavorite = useCallback((recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites]);

  const getFavorites = useCallback(() => {
    return favorites;
  }, [favorites]);

  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    toast.success('All favorites cleared');
  }, [setFavorites]);

  const sortFavorites = useCallback((sortBy = 'name') => {
    if (sortBy === 'name') {
      return [...favorites].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'recent') {
      return [...favorites].reverse();
    }
    if (sortBy === 'rating') {
      return [...favorites].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return favorites;
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavorites,
    getFavoritesCount,
    clearFavorites,
    sortFavorites
  };
}
