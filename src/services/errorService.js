class ErrorService {
  constructor() {
    this.errorListeners = new Set();
    this.errorLog = [];
  }

  handleError(error, context = {}) {
    const errorLog = {
      id: Date.now(),
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
      context
    };

    // Log to console
    console.error('Application Error:', errorLog);

    // Store in memory (limit to last 100 errors)
    this.errorLog.push(errorLog);
    if (this.errorLog.length > 100) {
      this.errorLog.shift();
    }

    // Notify error listeners
    this.errorListeners.forEach(listener => {
      try {
        listener(errorLog);
      } catch (listenerError) {
        console.error('Error in error listener:', listenerError);
      }
    });

    // Optional: Send to error tracking service
    this.reportErrorToService(errorLog);
  }

  reportErrorToService(errorLog) {
    try {
      // Use navigator.sendBeacon for more reliable error reporting
      const blob = new Blob([JSON.stringify(errorLog)], {type: 'application/json'});
      navigator.sendBeacon('/api/error-log', blob);
    } catch (reportError) {
      console.error('Error reporting failed', reportError);
    }
  }

  // Subscribe to error events
  subscribeToErrors(listener) {
    this.errorListeners.add(listener);
    return () => this.errorListeners.delete(listener);
  }

  // Get recent error logs
  getErrorLogs(limit = 10) {
    return this.errorLog.slice(-limit);
  }
}

export default new ErrorService();