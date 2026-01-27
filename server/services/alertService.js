import User from '../models/User.js';
import weatherService from './weatherService.js';
import cron from 'node-cron';

export const startAlertScheduler = () => {
  // Check alerts every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    console.log('Running weather alert check...');
    checkWeatherAlerts();
  });
};

export const checkWeatherAlerts = async () => {
  try {
    const users = await User.find({ 'alertPreferences.enabled': true });
    
    for (const user of users) {
      // Clean up notifications for removed cities
      const currentCityNames = user.cities.map(city => city.name);
      await User.findByIdAndUpdate(user._id, {
        $pull: { 
          notifications: { 
            city: { $nin: currentCityNames },
            createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Only remove old ones
          } 
        }
      });
      
      // Generate alerts for current cities only
      for (const city of user.cities) {
        const weather = await weatherService.getCurrentWeather(city.lat, city.lon);
        const alerts = generateAlerts(weather, user.alertPreferences, city.name);
        
        if (alerts.length > 0) {
          await saveNotifications(user._id, alerts);
        }
      }
    }
  } catch (error) {
    console.error('Alert check failed:', error);
  }
};

const generateAlerts = (weather, prefs, cityName) => {
  const alerts = [];
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed * 3.6; // Convert to km/h
  
  if (temp < prefs.tempMin) {
    alerts.push({
      type: 'alert',
      title: 'Cold Weather Alert',
      message: `Temperature in ${cityName} is ${temp}°C. Dress warmly!`,
      city: cityName
    });
  }
  
  if (temp > prefs.tempMax) {
    alerts.push({
      type: 'alert',
      title: 'Hot Weather Alert',
      message: `Temperature in ${cityName} is ${temp}°C. Stay hydrated!`,
      city: cityName
    });
  }
  
  if (humidity > prefs.humidityThreshold) {
    alerts.push({
      type: 'alert',
      title: 'High Humidity Alert',
      message: `High humidity in ${cityName} (${humidity}%). Rain possible!`,
      city: cityName
    });
  }
  
  if (wind > prefs.windThreshold) {
    alerts.push({
      type: 'alert',
      title: 'Wind Alert',
      message: `Strong winds in ${cityName} (${wind} km/h). Be careful outdoors!`,
      city: cityName
    });
  }
  
  return alerts;
};

const saveNotifications = async (userId, alerts) => {
  if (alerts.length === 0) return;
  
  // Get user's recent notifications (last 2 hours)
  const user = await User.findById(userId);
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const recentNotifications = user.notifications.filter(n => n.createdAt > twoHoursAgo);
  
  // Filter out duplicate alerts
  const newAlerts = alerts.filter(alert => {
    return !recentNotifications.some(recent => 
      recent.city === alert.city && 
      recent.title === alert.title
    );
  });
  
  if (newAlerts.length > 0) {
    await User.findByIdAndUpdate(userId, {
      $push: { notifications: { $each: newAlerts } }
    });
  }
};