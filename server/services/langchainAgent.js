class LangChainWeatherAgent {
  async generateWeatherInsights(weatherData, cityName) {
    return this._mockWeatherInsights(weatherData, cityName);
  }

  async generateTravelRecommendations(cities) {
    return this._mockTravelRecommendations(cities);
  }

  _mockWeatherInsights(weatherData, cityName) {
    const temp = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const weather = weatherData.weather[0].description;
    const windSpeed = weatherData.wind?.speed || 0;
    
    let insights = `🌤️ Weather in ${cityName}: ${weather} with ${temp}°C (feels like ${feelsLike}°C).\n\n`;
    
    // Temperature-based recommendations
    if (temp < 0) {
      insights += "🧥 Clothing: Heavy winter coat, gloves, hat, and warm boots essential.\n";
      insights += "❄️ Activities: Ice skating, winter sports, or cozy indoor activities.\n";
    } else if (temp < 10) {
      insights += "🧥 Clothing: Warm jacket, layers, and closed shoes recommended.\n";
      insights += "🚶 Activities: Great for museums, cafes, or brisk walks.\n";
    } else if (temp < 20) {
      insights += "👕 Clothing: Light jacket or sweater, comfortable for walking.\n";
      insights += "🌳 Activities: Perfect for sightseeing, parks, and outdoor exploration.\n";
    } else if (temp < 30) {
      insights += "👕 Clothing: Light clothing, t-shirt and pants ideal.\n";
      insights += "☀️ Activities: Excellent for outdoor activities, hiking, and tourism.\n";
    } else {
      insights += "🩳 Clothing: Light, breathable clothing and sun protection.\n";
      insights += "🏖️ Activities: Beach time, swimming, or early morning/evening outings.\n";
    }
    
    // Humidity warnings
    if (humidity > 80) {
      insights += "💧 High humidity - stay hydrated and take breaks in shade.\n";
    } else if (humidity < 30) {
      insights += "🌵 Low humidity - use moisturizer and drink plenty of water.\n";
    }
    
    // Wind conditions
    if (windSpeed > 10) {
      insights += "💨 Windy conditions - secure loose items and dress warmly.\n";
    }
    
    // Weather-specific tips
    if (weather.includes('rain')) {
      insights += "☔ Don't forget an umbrella and waterproof shoes!";
    } else if (weather.includes('snow')) {
      insights += "❄️ Watch for slippery conditions and dress in layers.";
    } else if (weather.includes('clear') || weather.includes('sunny')) {
      insights += "☀️ Great day to be outdoors! Don't forget sunscreen.";
    }
    
    return insights;
  }

  _mockTravelRecommendations(cities) {
    const cityNames = cities.map(city => city.name).join(', ');
    const cityCount = cities.length;
    
    let recommendations = `✈️ Travel Recommendations for ${cityNames}:\n\n`;
    
    // General packing advice
    recommendations += "🎒 Packing Essentials:\n";
    recommendations += "• Versatile clothing for layering\n";
    recommendations += "• Comfortable walking shoes\n";
    recommendations += "• Weather-appropriate outerwear\n";
    recommendations += "• Portable umbrella\n\n";
    
    // Multi-city specific advice
    if (cityCount > 1) {
      recommendations += "🗺️ Multi-City Tips:\n";
      recommendations += "• Check weather forecasts for each destination\n";
      recommendations += "• Pack for the most extreme weather expected\n";
      recommendations += "• Consider climate differences between cities\n\n";
    }
    
    // Seasonal advice
    const month = new Date().getMonth();
    if (month >= 11 || month <= 2) {
      recommendations += "❄️ Winter Travel: Pack warm layers, waterproof boots, and check for seasonal closures.";
    } else if (month >= 3 && month <= 5) {
      recommendations += "🌸 Spring Travel: Weather can be unpredictable - pack layers and rain gear.";
    } else if (month >= 6 && month <= 8) {
      recommendations += "☀️ Summer Travel: Light clothing, sun protection, and stay hydrated.";
    } else {
      recommendations += "🍂 Fall Travel: Perfect for sightseeing - pack layers for changing temperatures.";
    }
    
    return recommendations;
  }
}

export default new LangChainWeatherAgent();