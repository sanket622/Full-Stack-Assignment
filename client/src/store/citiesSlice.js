import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { citiesAPI } from '../services/api';

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  return await citiesAPI.getCities();
});

export const addCity = createAsyncThunk(
  'cities/addCity',
  async (city) => {
    return await citiesAPI.addCity(city);
  }
);

export const toggleFavorite = createAsyncThunk(
  'cities/toggleFavorite',
  async (cityId) => {
    return await citiesAPI.toggleFavorite(cityId);
  }
);

export const deleteCity = createAsyncThunk(
  'cities/deleteCity',
  async (cityId) => {
    await citiesAPI.deleteCity(cityId);
    return cityId;
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch cities';
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.cities.findIndex(city => city._id === action.payload._id);
        if (index !== -1) {
          state.cities[index] = action.payload;
        }
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter(city => city._id !== action.payload);
      });
  },
});

export const { clearError } = citiesSlice.actions;
export default citiesSlice.reducer;