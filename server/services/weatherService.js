import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class WeatherService {
  constructor() {
    this.baseURL = 'https://api.weatherstack.com';
    this.apiKey = process.env.WEATHERSTACK_API_KEY;
    
    if (!this.apiKey) {
      console.error('WEATHERSTACK_API_KEY not found in environment variables');
    }
  }

  async getCurrentWeather(lat, lon) {
    try {
      const response = await axios.get(`${this.baseURL}/current`, {
        params: {
          access_key: this.apiKey,
          query: `${lat},${lon}`,
          units: 'm'
        }
      });
      
      const data = response.data;
      if (data.error) {
        throw new Error(data.error.info);
      }
      
      return {
        main: {
          temp: data.current.temperature,
          feels_like: data.current.feelslike,
          humidity: data.current.humidity,
          pressure: data.current.pressure
        },
        weather: [{
          main: data.current.weather_descriptions[0],
          description: data.current.weather_descriptions[0].toLowerCase(),
          icon: '01d' 
        }],
        wind: {
          speed: data.current.wind_speed / 3.6 
        },
        name: data.location.name
      };
    } catch (error) {
      throw new Error(`Weather API error: ${error.message}`);
    }
  }

  async searchCities(query) {
    try {
      const response = await axios.get(`${this.baseURL}/current`, {
        params: {
          access_key: this.apiKey,
          query: query
        }
      });
      
      const data = response.data;
      if (data.error) {
        throw new Error(data.error.info);
      }
      
      return [{
        name: data.location.name,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        state: data.location.region
      }];
    } catch (error) {
      throw new Error(`Geocoding API error: ${error.message}`);
    }
  }

  async getForecast(lat, lon) {
    throw new Error('Forecast not available with current plan');
  }
}

export default new WeatherService();