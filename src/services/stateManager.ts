class StateManager {
    private history: any[] = [];
    private currentIndex = -1;
  
    pushState(state: any) {
      this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(state);
      this.currentIndex++;
    }
  
    undo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        return this.history[this.currentIndex];
      }
      return null;
    }
  
    redo() {
      if (this.currentIndex < this.history.length - 1) {
        this.currentIndex++;
        return this.history[this.currentIndex];
      }
      return null;
    }
  }
  
  export default new StateManager();
  