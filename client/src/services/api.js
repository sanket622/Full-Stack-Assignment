import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const citiesAPI = {
  getCities: async () => {
    const response = await api.get('/cities');
    return response.data;
  },
  
  addCity: async (city) => {
    const response = await api.post('/cities', city);
    return response.data;
  },
  
  toggleFavorite: async (cityId) => {
    const response = await api.patch(`/cities/${cityId}/favorite`);
    return response.data;
  },
  
  deleteCity: async (cityId) => {
    await api.delete(`/cities/${cityId}`);
  }
};

export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    const response = await api.get(`/weather/current/${lat}/${lon}`);
    return response.data;
  },
  
  searchCities: async (query) => {
    const response = await api.get(`/weather/search/${query}`);
    return response.data;
  },
  
  getForecast: async (lat, lon) => {
    const response = await api.get(`/weather/forecast/${lat}/${lon}`);
    return response.data;
  }
};

export const aiAPI = {
  getInsights: async (lat, lon, cityName) => {
    const response = await api.post('/ai/insights', { lat, lon, cityName });
    return response.data;
  },
  
  getTravelRecommendations: async (cities) => {
    const response = await api.post('/ai/travel-recommendations', { cities });
    return response.data;
  }
};