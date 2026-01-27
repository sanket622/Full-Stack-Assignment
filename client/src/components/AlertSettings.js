import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlertPreferences, updateAlertPreferences } from '../store/notificationsSlice';

const AlertSettings = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { alertPreferences } = useSelector(state => state.notifications);
  const [settings, setSettings] = useState(alertPreferences);

  useEffect(() => {
    dispatch(fetchAlertPreferences());
  }, [dispatch]);

  useEffect(() => {
    setSettings(alertPreferences);
  }, [alertPreferences]);

  const handleSave = () => {
    dispatch(updateAlertPreferences(settings));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Alert Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Enable Alerts</label>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings({...settings, enabled: e.target.checked})}
              className="rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Min Temperature (°C)</label>
            <input
              type="number"
              value={settings.tempMin}
              onChange={(e) => setSettings({...settings, tempMin: Number(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Temperature (°C)</label>
            <input
              type="number"
              value={settings.tempMax}
              onChange={(e) => setSettings({...settings, tempMax: Number(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Humidity Threshold (%)</label>
            <input
              type="number"
              value={settings.humidityThreshold}
              onChange={(e) => setSettings({...settings, humidityThreshold: Number(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Wind Threshold (km/h)</label>
            <input
              type="number"
              value={settings.windThreshold}
              onChange={(e) => setSettings({...settings, windThreshold: Number(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notification Types</label>
            <div className="flex items-center justify-between">
              <span className="text-sm">In-App Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.inApp}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, inApp: e.target.checked}
                })}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, email: e.target.checked}
                })}
                className="rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Settings
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSettings;