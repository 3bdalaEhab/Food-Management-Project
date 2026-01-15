export const memoize = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  };
};

export const lazy = (componentLoader) => {
  const lazyComponent = React.lazy(componentLoader);
  return (props) => (
    <React.Suspense fallback={<LoadingFallback />}>
      <lazyComponent {...props} />
    </React.Suspense>
  );
};

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      color: '#666',
    }}
  >
    Loading...
  </div>
);

export const debounce = (fn, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, delay) => {
  let lastCall = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

export const measurePerformance = (label) => {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    console.log(`${label}: ${duration}ms`);
    return duration;
  };
};

export const optimizeImage = (url, width = null, height = null, quality = 'high') => {
  if (!url) return null;

  const qualityMap = {
    low: 60,
    medium: 80,
    high: 100,
  };

  const params = new URLSearchParams();

  if (width) params.set('w', width);
  if (height) params.set('h', height);
  params.set('q', qualityMap[quality] || 80);

  return `${url}?${params.toString()}`;
};

export const batchRequests = async (requests, batchSize = 5) => {
  const results = [];

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  return results;
};

export const lazyLoadImage = (imagePath, placeholder = null) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      resolve(imagePath);
    };

    img.onerror = () => {
      resolve(placeholder);
    };

    img.src = imagePath;
  });
};
