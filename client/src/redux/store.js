import { configureStore } from '@reduxjs/toolkit';
import { instanceApi } from '../utils/axios';
import { createReducerManager } from './createReducerManager';
import { auth, authReducer } from './features/auth/authSlice';
import { postSliceName, postSliceReducer } from './features/post/postSlice';

export const createReduxStore = (initialState, asyncReducers, navigate) => {
  const rootReducers = {
    ...asyncReducers,
    [postSliceName]: postSliceReducer,
    [auth]: authReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArgument = {
    api: instanceApi,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
        serializableCheck: false,
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};
