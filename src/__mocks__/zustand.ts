import { act } from '@testing-library/react';
import type { StateCreator } from 'zustand';

// Define proper types for the Zustand store
type StoreApi<T> = {
  getState: () => T;
  setState: (fn: (state: T) => T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const actualCreate = require('zustand').default;

const createStore = <T>(config: StateCreator<T>): (() => T & { setState: StoreApi<T>['setState'] }) => {
  const store = actualCreate(config);
  const initialState = store.getState();
  
  return () => ({
    ...initialState,
    setState: (fn: (state: T) => void) => act(() => store.setState(fn)),
  });
};

export default createStore;
