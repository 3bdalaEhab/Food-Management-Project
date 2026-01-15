// 📚 ADVANCED FEATURE IMPLEMENTATION EXAMPLES
// =============================================
// Use these practical examples to develop new features

// ============================================================================
// 1. ADVANCED API INTEGRATION WITH CACHING & ERROR HANDLING
// ============================================================================

/**
 * Advanced Axios Instance with Retry Logic
 */
export const createAdvancedAxiosInstance = () => {
  const instance = axiosInstance;

  // Retry configuration
  const retryConfig = {
    maxRetries: 3,
    retryDelay: 1000,
    retryableStatuses: [408, 429, 500, 502, 503, 504]
  };

  // Add retry interceptor
  instance.interceptors.response.use(
    response => response,
    async error => {
      const config = error.config;

      if (!config || !config.retryCount) {
        config.retryCount = 0;
      }

      config.retryCount += 1;

      if (
        config.retryCount <= retryConfig.maxRetries &&
        retryConfig.retryableStatuses.includes(error.response?.status)
      ) {
        const delay = retryConfig.retryDelay * Math.pow(2, config.retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        return instance(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// ============================================================================
// 2. ADVANCED FORM HANDLING WITH MULTI-STEP VALIDATION
// ============================================================================

/**
 * Multi-Step Form Hook
 */
export function useMultiStepForm(steps, onSubmit) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    // Validate current step
    const stepSchema = steps[currentStep].schema;
    const stepData = formData[currentStep];

    try {
      await stepSchema.validate(stepData);
      setErrors({});
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      setErrors({ [error.path]: error.message });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [fieldName]: value
      }
    }));
  };

  const handleSubmit = async () => {
    // Validate all steps
    try {
      for (let step of steps) {
        await step.schema.validate(formData[steps.indexOf(step)] || {});
      }
      onSubmit(formData);
    } catch (error) {
      toast.error('Please fix all errors before submitting');
    }
  };

  return {
    currentStep,
    totalSteps: steps.length,
    currentStepData: steps[currentStep],
    formData,
    errors,
    handleNext,
    handleBack,
    handleFieldChange,
    handleSubmit,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1
  };
}

// Example Usage:
/**
const recipeSteps = [
  {
    title: 'Basic Information',
    schema: yup.object().shape({
      name: yup.string().required('Name is required'),
      description: yup.string().required('Description is required')
    })
  },
  {
    title: 'Ingredients',
    schema: yup.object().shape({
      ingredients: yup.array().min(1, 'At least one ingredient required')
    })
  },
  {
    title: 'Instructions',
    schema: yup.object().shape({
      instructions: yup.string().required('Instructions required')
    })
  }
];

const { handleNext, handleBack, isLastStep, currentStepData } = 
  useMultiStepForm(recipeSteps, submitRecipe);
*/

// ============================================================================
// 3. INFINITE SCROLL WITH VIRTUALIZATION
// ============================================================================

/**
 * Infinite Scroll Hook
 */
export function useInfiniteScroll(fetchMore, hasMore) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchMore, hasMore]);

  return observerTarget;
}

// Example Usage in Component:
/**
function InfiniteRecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.RECIPES.GET_ALL}?page=${page}`
    );
    setRecipes(prev => [...prev, ...response.data]);
    setPage(prev => prev + 1);
    setHasMore(response.data.length > 0);
  };

  const observerTarget = useInfiniteScroll(fetchMore, hasMore);

  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <div ref={observerTarget} />
    </div>
  );
}
*/

// ============================================================================
// 4. ADVANCED FILTERING WITH STATE PERSISTENCE
// ============================================================================

/**
 * Advanced Filter Hook with LocalStorage Persistence
 */
export function useAdvancedFilters(storageKey) {
  const [filters, setFilters] = useLocalStorage(storageKey, {
    search: '',
    categories: [],
    difficulty: 'all',
    timeRange: [0, 120],
    rating: 0,
    sortBy: 'newest'
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setFilters]);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      categories: [],
      difficulty: 'all',
      timeRange: [0, 120],
      rating: 0,
      sortBy: 'newest'
    });
  }, [setFilters]);

  const applyFilters = useCallback((items) => {
    return items.filter(item => {
      // Search filter
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && item.difficulty !== filters.difficulty) {
        return false;
      }

      // Time range filter
      if (item.time < filters.timeRange[0] || item.time > filters.timeRange[1]) {
        return false;
      }

      // Rating filter
      if (item.rating < filters.rating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    applyFilters
  };
}

// ============================================================================
// 5. DEBOUNCED SEARCH WITH AUTOCOMPLETE
// ============================================================================

/**
 * Autocomplete Hook
 */
export function useAutocomplete(searchFunction) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    searchFunction(debouncedQuery)
      .then(setSuggestions)
      .finally(() => setLoading(false));
  }, [debouncedQuery, searchFunction]);

  return {
    query,
    setQuery,
    suggestions,
    loading
  };
}

// Example Usage:
/**
const { query, setQuery, suggestions } = useAutocomplete(
  async (query) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.RECIPES.SEARCH}?q=${query}`
    );
    return response.data.slice(0, 10);
  }
);

<input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search recipes..."
/>

{suggestions.map(suggestion => (
  <li key={suggestion.id}>{suggestion.name}</li>
))}
*/

// ============================================================================
// 6. NOTIFICATION SYSTEM WITH QUEUE
// ============================================================================

/**
 * Notification Queue Manager
 */
class NotificationQueue {
  constructor() {
    this.queue = [];
    this.maxNotifications = 3;
  }

  add(notification) {
    this.queue.push({
      id: Date.now(),
      ...notification
    });

    if (this.queue.length > this.maxNotifications) {
      this.queue.shift();
    }

    return this.queue;
  }

  remove(id) {
    this.queue = this.queue.filter(n => n.id !== id);
    return this.queue;
  }

  getAll() {
    return this.queue;
  }

  clear() {
    this.queue = [];
  }
}

export const notificationQueue = new NotificationQueue();

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type
    };

    setNotifications(prev => [...prev, notification].slice(-3));

    setTimeout(() => {
      setNotifications(prev =>
        prev.filter(n => n.id !== notification.id)
      );
    }, 3000);
  }, []);

  return {
    notifications,
    addNotification
  };
}

// ============================================================================
// 7. DATA EXPORT/IMPORT FUNCTIONALITY
// ============================================================================

/**
 * Export Data Helper
 */
export function exportToCSV(data, filename) {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => `"${row[header] || ''}"`).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToJSON(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// ============================================================================
// 8. REAL-TIME DATA SYNC WITH WEBSOCKETS
// ============================================================================

/**
 * WebSocket Hook for Real-time Updates
 */
export function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('connecting');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setStatus('connected');
    ws.current.onmessage = event => setData(JSON.parse(event.data));
    ws.current.onerror = () => setStatus('error');
    ws.current.onclose = () => setStatus('disconnected');

    return () => ws.current?.close();
  }, [url]);

  const send = useCallback(message => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { data, status, send };
}

// ============================================================================
// 9. ADVANCED PERMISSIONS & ROLE-BASED ACCESS
// ============================================================================

/**
 * Permission/Role Management
 */
export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  }, [user]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  const canAccess = useCallback((requiredRoles, requiredPermissions = []) => {
    if (!user) return false;

    const hasRole = Array.isArray(requiredRoles)
      ? requiredRoles.includes(user.role)
      : user.role === requiredRoles;

    const hasAllPermissions = requiredPermissions.every(perm =>
      user.permissions?.includes(perm)
    );

    return hasRole && hasAllPermissions;
  }, [user]);

  return {
    hasPermission,
    hasRole,
    canAccess,
    user
  };
}

// Example Usage:
/**
function ProtectedFeature() {
  const { hasPermission, canAccess } = usePermissions();

  if (!canAccess('admin', ['recipes:delete'])) {
    return <div>Access Denied</div>;
  }

  return <div>Protected Content</div>;
}
*/

// ============================================================================
// 10. ADVANCED ANALYTICS TRACKING
// ============================================================================

/**
 * Analytics Helper
 */
export class AnalyticsManager {
  static track(eventName, eventData) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: eventData,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Send to analytics service
    axiosInstance.post(API_ENDPOINTS.ANALYTICS.TRACK, event).catch(error => {
      console.error('Analytics error:', error);
    });
  }

  static trackPageView(pageName) {
    this.track('page_view', { page: pageName });
  }

  static trackEvent(eventName, properties = {}) {
    this.track('custom_event', { event: eventName, ...properties });
  }

  static trackError(error) {
    this.track('error', {
      message: error.message,
      stack: error.stack
    });
  }
}

// Usage:
// AnalyticsManager.trackPageView('recipes');
// AnalyticsManager.trackEvent('recipe_viewed', { recipeId: 123 });
// AnalyticsManager.trackError(error);

// ============================================================================
// 11. SMART CACHING STRATEGY
// ============================================================================

/**
 * Smart Cache Manager with Expiration
 */
export class SmartCacheManager {
  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.hitRate = { hits: 0, misses: 0 };
  }

  set(key, value, ttl = 3600000) {
    // Remove oldest if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      this.hitRate.misses++;
      return null;
    }

    if (item.expires < Date.now()) {
      this.cache.delete(key);
      this.hitRate.misses++;
      return null;
    }

    this.hitRate.hits++;
    return item.value;
  }

  getHitRate() {
    const total = this.hitRate.hits + this.hitRate.misses;
    return total === 0 ? 0 : (this.hitRate.hits / total * 100).toFixed(2) + '%';
  }

  clear() {
    this.cache.clear();
    this.hitRate = { hits: 0, misses: 0 };
  }
}

// ============================================================================
// QUICK REFERENCE
// ============================================================================

/*
USAGE PATTERNS:

1. Advanced API:
   const api = createAdvancedAxiosInstance();
   const response = await api.get(url); // Retries on failure

2. Multi-Step Form:
   const form = useMultiStepForm(steps, onSubmit);
   form.handleNext();

3. Infinite Scroll:
   const target = useInfiniteScroll(fetchMore, hasMore);
   <div ref={target} />

4. Advanced Filters:
   const { filters, updateFilter, applyFilters } = useAdvancedFilters('recipes');
   const filtered = applyFilters(recipes);

5. Autocomplete:
   const { query, setQuery, suggestions } = useAutocomplete(search);

6. Export Data:
   exportToCSV(recipes, 'recipes');
   exportToJSON(recipes, 'recipes');

7. WebSocket:
   const { data, status, send } = useWebSocket('wss://api.example.com');

8. Permissions:
   const { hasPermission, canAccess } = usePermissions();
   if (canAccess('admin')) { ... }

9. Analytics:
   AnalyticsManager.trackEvent('recipe_created', { category: 'dessert' });

10. Smart Cache:
    const cache = new SmartCacheManager();
    cache.set('recipes', data, 300000);
    const cached = cache.get('recipes');
*/

export default {
  createAdvancedAxiosInstance,
  useMultiStepForm,
  useInfiniteScroll,
  useAdvancedFilters,
  useAutocomplete,
  useNotifications,
  exportToCSV,
  exportToJSON,
  importFromJSON,
  useWebSocket,
  usePermissions,
  AnalyticsManager,
  SmartCacheManager
};
