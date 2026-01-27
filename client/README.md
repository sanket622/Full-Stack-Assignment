# Weather Dashboard Client

A modern React-based weather dashboard application with AI-powered insights and travel recommendations.

## Features

### Core Functionality
- **User Authentication**: Secure login and registration system
- **City Management**: Add, remove, and favorite cities
- **Real-time Weather**: Current weather data for tracked cities
- **Smart Weather Alerts**: Proactive notifications with customizable thresholds for temperature, humidity, and wind conditions
- **AI Insights**: Get AI-powered weather insights for each city
- **Travel Recommendations**: AI-generated travel tips based on your cities

### User Experience
- **Smart Notifications**: Notification bell with unread count and contextual weather alerts
- **Alert Settings**: Customizable weather thresholds through an intuitive settings modal
- **Shimmer Loading UI**: Elegant loading states with shimmer effects while data loads
- **Responsive Design**: Optimized for desktop and mobile devices
- **Favorite Cities**: Star cities for quick access
- **Interactive Cards**: Hover effects and smooth transitions

## Technology Stack

- **React 18**: Modern React with hooks
- **Redux Toolkit**: State management
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Environment Setup
Ensure the backend server is running on port 8080 for API connectivity.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── WeatherCard.js   # Weather display card
│   ├── ShimmerCard.js   # Loading shimmer component
│   ├── AddCityModal.js  # City addition modal
│   └── ProtectedRoute.js # Route protection
├── pages/               # Main application pages
│   ├── Dashboard.js     # Main dashboard
│   ├── Login.js         # Login page
│   └── Register.js      # Registration page
├── store/               # Redux store configuration
│   ├── index.js         # Store setup
│   ├── authSlice.js     # Authentication state
│   └── citiesSlice.js   # Cities state management
├── services/            # API service layer
│   └── api.js           # API endpoints
└── hooks/               # Custom React hooks
    └── redux.js         # Typed Redux hooks
```

## Key Components

### ShimmerCard
A loading placeholder component that mimics the WeatherCard layout:
- Animated shimmer effect using CSS animations
- Matches the exact dimensions and layout of weather cards
- Provides visual feedback during data loading

### WeatherCard
Displays weather information with:
- Current temperature and conditions
- Weather icons from OpenWeatherMap
- Humidity, pressure, and wind data
- AI insights integration
- Favorite/delete actions

### Dashboard
Main application interface featuring:
- Grid layout for weather cards
- Shimmer loading states for better UX
- Favorite cities section
- AI travel recommendations

## Loading States

The application implements comprehensive loading states:

1. **Initial Load**: Shimmer cards display while fetching cities
2. **Weather Data**: Individual cards show shimmer while loading weather
3. **AI Features**: Loading indicators for insights and recommendations

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: This is a one-way operation!**
Ejects from Create React App for full configuration control

## API Integration

The client communicates with the backend server through:
- Authentication endpoints for login/register
- Cities CRUD operations
- Weather data fetching
- AI service integration

## Styling

Uses Tailwind CSS for:
- Responsive grid layouts
- Hover effects and transitions
- Loading animations
- Color schemes and typography
- Mobile-first design approach

## Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Renders**: Redux state management prevents unnecessary re-renders
- **Shimmer UI**: Perceived performance improvement during loading
- **Efficient API Calls**: Proper error handling and loading states