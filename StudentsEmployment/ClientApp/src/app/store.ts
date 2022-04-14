import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import { errorHandlingMiddleware } from './middlewares/error-handling-middlewares';
import { pendingHandlingMiddleware } from './middlewares/pending-handling-middleware';

import { alertReducer } from '@/common/components/alert';
import { busyIndicatorReducer } from '@/common/components/busy-indicator';


const rootReducer = combineReducers({
  common: combineReducers({
    alert: alertReducer,
    busyIndicator: busyIndicatorReducer
  }),
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      errorHandlingMiddleware,
      pendingHandlingMiddleware,
    ),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
