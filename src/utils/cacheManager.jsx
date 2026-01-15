class CacheManager {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.accessOrder = [];
  }

  set(key, value, ttl = null) {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.shift();
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl,
    });

    if (this.accessOrder.includes(key)) {
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
    }
    this.accessOrder.push(key);
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
      return null;
    }

    if (this.accessOrder.includes(key)) {
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
    }
    this.accessOrder.push(key);

    return item.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    this.cache.clear();
    this.accessOrder = [];
  }

  delete(key) {
    this.cache.delete(key);
    this.accessOrder = this.accessOrder.filter((k) => k !== key);
  }

  getSize() {
    return this.cache.size;
  }
}

export const cacheManager = new CacheManager(100);

export const getCachedData = (key) => {
  return cacheManager.get(key);
};

export const setCachedData = (key, value, ttl) => {
  cacheManager.set(key, value, ttl);
};

export const clearCache = () => {
  cacheManager.clear();
};

export const invalidateCache = (key) => {
  cacheManager.delete(key);
};

export const isCached = (key) => {
  return cacheManager.has(key);
};
