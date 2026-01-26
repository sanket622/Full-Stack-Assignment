import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user's cities
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.cities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add city
router.post('/', auth, async (req, res) => {
  try {
    const { name, country, lat, lon } = req.body;

    if (!name || !country || lat === undefined || lon === undefined) {
      return res.status(400).json({ message: 'Please provide all city details' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if city already exists
    const existingCity = user.cities.find(city => 
      city.name.toLowerCase() === name.toLowerCase() && 
      city.country.toLowerCase() === country.toLowerCase()
    );

    if (existingCity) {
      return res.status(400).json({ message: 'City already added' });
    }

    const newCity = { name, country, lat, lon, isFavorite: false };
    user.cities.push(newCity);
    await user.save();

    res.status(201).json(user.cities[user.cities.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle favorite
router.patch('/:cityId/favorite', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const city = user.cities.id(req.params.cityId);

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    city.isFavorite = !city.isFavorite;
    await user.save();

    res.json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete city
router.delete('/:cityId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const city = user.cities.id(req.params.cityId);
    
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    user.cities.pull(req.params.cityId);
    await user.save();

    res.json({ message: 'City removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;