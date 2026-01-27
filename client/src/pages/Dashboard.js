import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCities } from '../store/citiesSlice';
import { logout } from '../store/authSlice';
import WeatherCard from '../components/WeatherCard';
import AddCityModal from '../components/AddCityModal';
import ShimmerCard from '../components/ShimmerCard';
import NotificationBell from '../components/NotificationBell';
import AlertSettings from '../components/AlertSettings';
import { aiAPI } from '../services/api';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cities, isLoading } = useAppSelector((state) => state.cities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAlertSettingsOpen, setIsAlertSettingsOpen] = useState(false);
  const [travelRecommendations, setTravelRecommendations] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
    }
  };

  const handleGetTravelRecommendations = async () => {
    if (cities.length === 0) return;

    try {
      setShowRecommendations(true);
      const response = await aiAPI.getTravelRecommendations(cities);
      setTravelRecommendations(response.recommendations);
    } catch (error) {
      console.error('Failed to get travel recommendations:', error);
      setTravelRecommendations('Unable to generate travel recommendations at the moment.');
    }
  };

  const favoriteCities = cities.filter(city => city.isFavorite);
  const regularCities = cities.filter(city => !city.isFavorite);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Weather Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <button
                onClick={() => setIsAlertSettingsOpen(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                Alert Settings
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Add City
              </button>
              {cities.length > 0 && (
                <button
                  onClick={handleGetTravelRecommendations}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Travel Tips
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {showRecommendations && travelRecommendations && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  AI Travel Recommendations
                </h2>
                <p className="text-green-700 whitespace-pre-line">{travelRecommendations}</p>
              </div>
              <button
                onClick={() => setShowRecommendations(false)}
                className="text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading Cities...</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <ShimmerCard key={index} />
                ))}
              </div>
            </div>
          </div>
        ) : cities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No cities added yet</h2>
            <p className="text-gray-600 mb-6">Add your first city to start tracking weather!</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
            >
              Add Your First City
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {favoriteCities.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  ⭐ Favorite Cities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCities.map((city) => (
                    <WeatherCard key={city._id} city={city} />
                  ))}
                </div>
              </div>
            )}

            {regularCities.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  All Cities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularCities.map((city) => (
                    <WeatherCard key={city._id} city={city} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <AddCityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <AlertSettings
        isOpen={isAlertSettingsOpen}
        onClose={() => setIsAlertSettingsOpen(false)}
      />
    </div>
  );
};

export default Dashboard;