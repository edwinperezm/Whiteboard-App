class ErrorService {
    logError(error: Error, context?: string) {
      console.error('Error:', {
        message: error.message,
        context,
        timestamp: new Date().toISOString()
      });
    }
  
    handleError(error: Error) {
      this.logError(error);
      // Add error handling logic here
    }
  }
  
  export default new ErrorService();
  