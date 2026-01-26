import React, { useState } from 'react';
import { weatherAPI } from '../services/api';
import { useAppDispatch } from '../hooks/redux';
import { addCity } from '../store/citiesSlice';

const AddCityModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const results = await weatherAPI.searchCities(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = async (city) => {
    try {
      await dispatch(addCity({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon
      })).unwrap();
      onClose();
      setQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Failed to add city:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New City</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((city, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{city.name}</p>
                    <p className="text-sm text-gray-600">
                      {city.state && `${city.state}, `}{city.country}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddCity(city)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : query && !loading ? (
            <p className="text-gray-500 text-center py-4">No cities found</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddCityModal;