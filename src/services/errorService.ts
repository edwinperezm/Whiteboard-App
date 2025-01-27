type ErrorContext = {
  userId?: string;
  action?: string;
  timestamp: string;
  details?: unknown;
};

class ErrorService {
  private readonly ERROR_STORAGE_KEY = 'app_errors';
  
  logError(error: Error, context?: string | object) {
    const errorContext: ErrorContext = {
      timestamp: new Date().toISOString(),
      details: context
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', {
        message: error.message,
        stack: error.stack,
        ...errorContext
      });
    }

    // Store error for later analysis
    this.storeError(error, errorContext);

    // Could add error reporting service here (e.g., Sentry)
  }

  private storeError(error: Error, context: ErrorContext) {
    try {
      const storedErrors = localStorage.getItem(this.ERROR_STORAGE_KEY);
      const errors = storedErrors ? JSON.parse(storedErrors) : [];
      errors.push({
        message: error.message,
        stack: error.stack,
        ...context
      });
      localStorage.setItem(this.ERROR_STORAGE_KEY, JSON.stringify(errors.slice(-10)));
    } catch (e) {
      console.error('Failed to store error:', e);
    }
  }

  handleError(error: Error) {
    this.logError(error);
    // Add user-friendly error handling here
    return {
      message: 'An unexpected error occurred. Please try again.',
      severity: 'error'
    };
  }

  clearStoredErrors() {
    localStorage.removeItem(this.ERROR_STORAGE_KEY);
  }
}

export default new ErrorService();
  