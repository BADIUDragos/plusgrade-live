import { configureStore, ThunkDispatch, AnyAction, PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer, RootState } from './combinedReducer';

import { baseApi } from './apis/baseApi';

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true,
  });
}

setupListeners(setupStore().dispatch);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type { RootState }
export type AppStore = ReturnType<typeof setupStore>

export default setupStore
