import React, { useState, useEffect, useCallback } from 'react';
import { weatherAPI, aiAPI } from '../services/api';
import { useAppDispatch } from '../hooks/redux';
import { toggleFavorite, deleteCity } from '../store/citiesSlice';
import ShimmerCard from './ShimmerCard';

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(true);
  const [showInsights, setShowInsights] = useState(false);
  const dispatch = useAppDispatch();

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      const weatherData = await weatherAPI.getCurrentWeather(city.lat, city.lon);
      setWeather(weatherData);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  }, [city.lat, city.lon]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(city._id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this city?')) {
      dispatch(deleteCity(city._id));
    }
  };

  const handleGetInsights = async () => {
    if (!weather) return;
    
    try {
      setShowInsights(true);
      const response = await aiAPI.getInsights(city.lat, city.lon, city.name);
      setInsights(response.insights);
    } catch (error) {
      console.error('Failed to get insights:', error);
      setInsights('Unable to generate insights at the moment.');
    }
  };

  if (loading) {
    return <ShimmerCard />;
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">{city.name}, {city.country}</h3>
        <p className="text-red-500">Failed to load weather data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            {city.name}, {city.country}
            {city.isFavorite && (
              <span className="ml-2 text-yellow-500">⭐</span>
            )}
          </h3>
          <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full ${
              city.isFavorite ? 'text-yellow-500' : 'text-gray-400'
            } hover:bg-gray-100`}
          >
            ⭐
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full text-red-500 hover:bg-red-50"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="text-sm text-gray-600">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
        <div className="text-right">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-16 h-16 ml-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
        <div>
          <p>Wind: {weather.wind?.speed || 0} m/s</p>
        </div>
      </div>

      <button
        onClick={handleGetInsights}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
      >
        Get AI Insights
      </button>

      {showInsights && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h4 className="font-semibold text-blue-800 mb-2">AI Weather Insights</h4>
          <p className="text-blue-700 text-sm">{insights}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;