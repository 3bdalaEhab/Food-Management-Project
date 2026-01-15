import { APP_CONFIG } from '@/config/constants';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLogLevel = logLevels[APP_CONFIG.LOG_LEVEL] || logLevels.info;

export const logger = {
  error: (message, data) => {
    if (currentLogLevel >= logLevels.error) {
      console.error(`[ERROR] ${message}`, data);
    }
  },

  warn: (message, data) => {
    if (currentLogLevel >= logLevels.warn) {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  info: (message, data) => {
    if (currentLogLevel >= logLevels.info) {
      console.log(`[INFO] ${message}`, data);
    }
  },

  debug: (message, data) => {
    if (currentLogLevel >= logLevels.debug) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
};
