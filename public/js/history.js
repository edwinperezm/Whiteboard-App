class HistoryManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.maxHistory = 50;
    }

    addAction(action) {
        this.currentIndex++;
        this.history.splice(this.currentIndex);
        this.history.push(action);
        
        if (this.history.length > this.maxHistory) {
            this.history.shift();
            this.currentIndex--;
        }
    }

    undo() {
        if (this.currentIndex >= 0) {
            const action = this.history[this.currentIndex];
            action.undo();
            this.currentIndex--;
        }
    }

    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            const action = this.history[this.currentIndex];
            action.redo();
        }
    }
}
