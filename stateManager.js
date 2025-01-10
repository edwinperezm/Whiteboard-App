class StateManager {
  static initState() {
    return {
      shapes: [],
      users: new Map(),
      history: [],
      version: 0,
    };
  }

  static updateState(state, update, type = "draw") {
    state.version++;

    switch (type) {
      case "draw":
        state.shapes.push(update);
        break;
      case "move":
        const index = state.shapes.findIndex((s) => s.id === update.id);
        if (index !== -1) {
          state.shapes[index] = { ...state.shapes[index], ...update };
        }
        break;
      case "user":
        state.users.set(update.id, update);
        break;
      default:
        break;
    }

    state.history.push({
      type,
      update,
      timestamp: Date.now(),
      version: state.version,
    });

    if (state.history.length > 50) {
      state.history.shift();
    }

    return state;
  }
}

module.exports = StateManager;
