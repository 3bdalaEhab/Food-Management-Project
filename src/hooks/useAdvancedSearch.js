import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { axiosInstance } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';
import toast from 'react-hot-toast';

export function useAdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: 'all',
    maxTime: 120,
    minRating: 0
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const search = useCallback(async () => {
    if (!debouncedSearchTerm && !filters.category) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ALL, {
        params: {
          search: debouncedSearchTerm,
          category: filters.category,
          difficulty: filters.difficulty,
          maxTime: filters.maxTime,
          minRating: filters.minRating
        }
      });
      
      // Filter results based on criteria
      const filtered = response.data.filter(recipe => {
        if (debouncedSearchTerm && 
            !recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
            !recipe.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) {
          return false;
        }
        if (filters.category && recipe.category !== filters.category) {
          return false;
        }
        if (filters.difficulty !== 'all' && recipe.difficulty !== filters.difficulty) {
          return false;
        }
        if (recipe.cookingTime > filters.maxTime) {
          return false;
        }
        if (recipe.rating < filters.minRating) {
          return false;
        }
        return true;
      });
      
      setResults(filtered);
    } catch (err) {
      setError('Failed to search recipes');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, filters]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({
      category: '',
      difficulty: 'all',
      maxTime: 120,
      minRating: 0
    });
    setResults([]);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results,
    loading,
    error,
    search,
    resetFilters
  };
}
