class StateManager {
  static initState() {
    return {
      shapes: [],
      users: new Map(),
      history: [],
      version: 0
    };
  }

  static updateState(state, update, type = 'draw') {
    state.version++;

    switch(type) {
      case 'draw':
        state.shapes.push(update);
        break;
      case 'move':
        const index = state.shapes.findIndex(s => s.id === update.id);
        if (index !== -1) {
          state.shapes[index] = {...state.shapes[index], ...update};
        }
        break;
      case 'user':
        state.users.set(update.id, update);
        break;
      default:
        // Handle default case
        break;
    }

    // Maintain limited history
    if (state.history.length > 50) {
      state.history.shift();
    }
    state.history.push({ 
      type, 
      update, 
      timestamp: Date.now(),
      version: state.version 
    });

    return state;
  }

  static undo(state) {
    if (state.history.length > 0) {
      const lastAction = state.history.pop();
      // Implement reverse logic based on action type
      return state;
    }
    return state;
  }
}

module.exports = StateManager;


