import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import citiesReducer from './citiesSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cities: citiesReducer,
    notifications: notificationsReducer,
  },
});