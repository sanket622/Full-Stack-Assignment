import express from 'express';
import weatherService from '../services/weatherService.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get current weather for a city
router.get('/current/:lat/:lon', auth, async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const weather = await weatherService.getCurrentWeather(parseFloat(lat), parseFloat(lon));
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data', error: error.message });
  }
});

// Search cities
router.get('/search/:query', auth, async (req, res) => {
  try {
    const { query } = req.params;
    const cities = await weatherService.searchCities(query);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search cities', error: error.message });
  }
});

// Get forecast
router.get('/forecast/:lat/:lon', auth, async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const forecast = await weatherService.getForecast(parseFloat(lat), parseFloat(lon));
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch forecast data', error: error.message });
  }
});

export default router;