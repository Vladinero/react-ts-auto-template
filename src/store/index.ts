import {configureStore} from '@reduxjs/toolkit';
import {projectApi} from './ProjectApi/projectApi';
import {setupListeners} from '@reduxjs/toolkit/query';
import {githubReducer} from './slices/project.slice';

export const store = configureStore({
  reducer: {
  [ projectApi.reducerPath]:  projectApi.reducer,
    github: githubReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(projectApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>