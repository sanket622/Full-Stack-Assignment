import express from 'express';
import langchainAgent from '../services/langchainAgent.js';
import weatherService from '../services/weatherService.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get AI weather insights for a city
router.post('/insights', auth, async (req, res) => {
  try {
    const { lat, lon, cityName } = req.body;
    
    if (!lat || !lon || !cityName) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const weatherData = await weatherService.getCurrentWeather(lat, lon);
    const insights = await langchainAgent.generateWeatherInsights(weatherData, cityName);
    
    res.json({ insights, weatherData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate insights', error: error.message });
  }
});

// Get travel recommendations for user's cities
router.post('/travel-recommendations', auth, async (req, res) => {
  try {
    const { cities } = req.body;
    
    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ message: 'No cities provided' });
    }

    const recommendations = await langchainAgent.generateTravelRecommendations(cities);
    
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate recommendations', error: error.message });
  }
});

export default router;