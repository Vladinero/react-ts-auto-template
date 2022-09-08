import {configureStore} from '@reduxjs/toolkit';
import {projectApi} from './ProjectApi/projectApi';
import {setupListeners} from '@reduxjs/toolkit/query';
import {githubReducer} from './slices/project.slice';
import {goodsApi} from './ProjectApi/goodsApi';

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    github: githubReducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(projectApi.middleware, goodsApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>