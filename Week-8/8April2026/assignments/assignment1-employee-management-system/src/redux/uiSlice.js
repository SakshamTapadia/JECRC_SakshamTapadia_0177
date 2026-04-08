import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  loading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { toggleTheme, setLoading, showNotification, clearNotification } = uiSlice.actions;

export const selectTheme = (state) => state.ui.theme;
export const selectLoading = (state) => state.ui.loading;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;
