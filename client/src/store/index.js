import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import citiesReducer from './citiesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cities: citiesReducer,
  },
});