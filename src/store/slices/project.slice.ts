import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const LS_FAV_KEY = 'rfk';

interface GithubState {
  favourites: string[]
}

const initialState: GithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addToFavourite(state, action: PayloadAction<string> ) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    },
    removeFromFavourite(state, action: PayloadAction<string>) {

      state.favourites = state.favourites.filter(item => item !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    }
  }
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;