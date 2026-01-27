import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationsAPI } from '../services/api';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await notificationsAPI.getNotifications();
    return response;
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id) => {
    await notificationsAPI.markAsRead(id);
    return id;
  }
);

export const fetchAlertPreferences = createAsyncThunk(
  'notifications/fetchAlertPreferences',
  async () => {
    const response = await notificationsAPI.getPreferences();
    return response;
  }
);

export const updateAlertPreferences = createAsyncThunk(
  'notifications/updateAlertPreferences',
  async (preferences) => {
    await notificationsAPI.updatePreferences(preferences);
    return preferences;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    alertPreferences: {
      enabled: true,
      tempMin: 0,
      tempMax: 35,
      humidityThreshold: 80,
      windThreshold: 50,
      notifications: {
        inApp: true,
        email: false
      }
    },
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n._id === action.payload);
        if (notification) notification.read = true;
      })
      .addCase(fetchAlertPreferences.fulfilled, (state, action) => {
        state.alertPreferences = action.payload;
      })
      .addCase(updateAlertPreferences.fulfilled, (state, action) => {
        state.alertPreferences = action.payload;
      });
  }
});

export default notificationsSlice.reducer;