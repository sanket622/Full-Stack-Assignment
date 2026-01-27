# Deployed backend Link = https://full-stack-assignment-flame.vercel.app/api/health

# Weather Dashboard - Multi-User Weather Application

A full-stack weather dashboard application built with React.js + Redux and Express.js, featuring AI-powered weather insights and travel recommendations.

## 🚀 Tech Stack Choice

**Frontend:** React.js + Redux Toolkit + TypeScript + Tailwind CSS  
**Backend:** Node.js + Express.js + MongoDB  
**AI Integration:** OpenAI GPT-3.5-turbo  
**Authentication:** JWT  

### Why React.js + Redux instead of Next.js?

I chose React.js with Redux over Next.js for the following reasons:

1. **State Management Complexity**: This application requires complex client-side state management for user authentication, city management, and weather data. Redux provides predictable state management with excellent DevTools support.

2. **Real-time Updates**: The dashboard needs frequent weather data updates and user interactions. Redux's centralized state makes it easier to manage these real-time updates across components.

3. **Client-Side Focus**: This is primarily a client-side application with minimal SEO requirements. React's SPA approach is more suitable than Next.js's SSR/SSG features.

4. **Learning Curve**: Redux provides explicit data flow patterns that make the application more maintainable and debuggable.

**Trade-offs:**
- No built-in SSR/SSG capabilities (not needed for this use case)
- Manual routing setup required
- Slightly more boilerplate code

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│  Express API    │────│    MongoDB      │
│   (Port 3000)   │    │   (Port 8080)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Redux   │             │Weather  │             │  User   │
    │ Store   │             │   API   │             │ Cities  │
    └─────────┘             └─────────┘             └─────────┘
                                 │
                            ┌────▼────┐
                            │OpenAI   │
                            │   API   │
                            └─────────┘
```

## 🔐 Authentication & Authorization

- **JWT-based authentication** with secure token storage
- **Password hashing** using bcryptjs
- **Protected routes** on both frontend and backend
- **User isolation** - users can only access their own data
- **Token expiration** handling with automatic logout

## 🤖 AI Agent Integration

The application features two AI-powered capabilities using OpenAI GPT-3.5-turbo:

### 1. Weather Insights Agent
- Analyzes current weather conditions for each city
- Provides clothing recommendations based on temperature and conditions
- Suggests activities suitable for the weather
- Offers weather warnings and practical tips

### 2. Travel Recommendations Agent
- Analyzes all user's cities collectively
- Provides travel timing recommendations
- Suggests packing lists based on destinations
- Highlights must-see attractions and local weather patterns

**AI Design Philosophy:**
- **Contextual**: Uses real weather data to provide relevant insights
- **Practical**: Focuses on actionable recommendations
- **User-centric**: Tailored to the user's specific cities and preferences

## ✨ Creative Feature: Smart Weather Alerts & Notifications System

**Problem Solved:** Users need proactive weather warnings to stay safe and plan their day effectively.

**Solution:** 
- **Real-time Monitoring**: Automated weather checks every 30 minutes using cron jobs
- **Customizable Thresholds**: Users set personal temperature, humidity, and wind speed limits
- **Smart Notifications**: Contextual alerts with actionable advice ("Dress warmly!", "Take an umbrella!")
- **Notification Management**: In-app notification bell with unread count and read status
- **Duplicate Prevention**: Avoids sending same alert multiple times within 2 hours
- **City-based Cleanup**: Automatically removes notifications when cities are deleted

**Why This Feature:**
- Enhances user safety with proactive weather warnings
- Provides personalized experience through customizable thresholds
- Demonstrates real-time data processing and scheduled task management
- Shows advanced notification system design with proper state management

**Technical Implementation:**
- Backend: Node-cron scheduler, MongoDB notifications storage, duplicate prevention logic
- Frontend: Redux state management, notification bell component, alert settings modal
- API: RESTful endpoints for preferences and notification management

## ⚡ Redis Caching Implementation

This project uses Redis for caching user profile data to improve performance and reduce database load.

### Why Redis?
- Fast in-memory data store for frequently accessed data
- Reduces MongoDB queries for user profile fetches
- Scalable for production (supports Redis Cloud)

### How It Works
- When the `/api/auth/me` endpoint is called, the server first checks Redis for the user profile.
- If found, it returns the cached profile.
- If not found, it fetches from MongoDB, returns the result, and caches it in Redis for future requests.

### Local Development Setup
1. Install Redis on your machine (e.g., with Homebrew: `brew install redis`).
2. Start Redis server locally: `redis-server`
3. Ensure your `.env` contains the following (for local):
   ```env
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_USERNAME= # (leave blank for local)
   REDIS_PASSWORD= # (leave blank for local)
   ```

### Production Setup (e.g., Vercel)
1. Create a Redis Cloud database (e.g., RedisLabs, Upstash).
2. Add your Redis credentials to your `.env` and Vercel environment variables:
   ```env
   REDIS_HOST=your-redis-host
   REDIS_PORT=your-redis-port
   REDIS_USERNAME=your-redis-username
   REDIS_PASSWORD=your-redis-password
   ```
3. The server will automatically use these credentials to connect to Redis Cloud in production.

### Related Files
- `services/redisClient.js` – Redis client setup and connection
- `routes/auth.js` – Uses Redis to cache user profile in `/me` route

### Example Usage
- On login or app load, frontend calls `/api/auth/me` to fetch user profile
- First call fetches from DB and caches in Redis
- Subsequent calls return cached profile (until cache expires)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (connection string provided)
- OpenAI API key (provided)

### Local Development

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd weather-dashboard
npm install
cd server && npm install
cd ../client && npm install
```

2. **Environment Setup:**
The `.env` file is already configured with your credentials:
```
PORT=8080
MONGODB_URI='//'
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Start the application:**
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on http://localhost:8080
- Frontend client on http://localhost:3000

### Production Deployment

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
• Vercel account (free at vercel.com)
• GitHub repository with your code
• MongoDB Atlas account for production database

### Step 1: Deploy Backend to Vercel
• Push your code to GitHub repository
• Go to vercel.com and click "New Project"
• Import your GitHub repository
• Select the `server` folder as root directory
• Add environment variables in Vercel dashboard:
  - `NODE_ENV=production`
  - `MONGODB_URI=your-production-mongodb-uri`
  - `JWT_SECRET=your-secure-jwt-secret`
  - `WEATHERSTACK_API_KEY=your-weatherstack-key`
• Click "Deploy"
• Copy the deployed backend URL (e.g., `https://your-backend.vercel.app`)

### Step 2: Deploy Frontend to Vercel
• Create a new Vercel project
• Import the same GitHub repository
• Select the `client` folder as root directory
• Add environment variable:
  - `REACT_APP_API_URL=https://your-backend.vercel.app/api`
• Set build command: `npm run build`
• Set output directory: `build`
• Click "Deploy"

### Step 3: Configure CORS (Important!)
• Update your backend `index.js` CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```
• Redeploy backend after CORS update

### Step 4: Test Production Deployment
• Visit your frontend URL
• Test user registration and login
• Add cities and verify weather data loads
• Test AI insights functionality

### Alternative: One-Click Deploy
• Fork the repository on GitHub
• Click deploy buttons below:
  - Frontend: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo&project-name=weather-frontend&root-directory=client)
  - Backend: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo&project-name=weather-backend&root-directory=server)

### Troubleshooting
• **CORS Error**: Ensure frontend URL is added to backend CORS configuration
• **API Not Found**: Verify `REACT_APP_API_URL` points to correct backend URL
• **Database Connection**: Check MongoDB Atlas network access and connection string
• **Environment Variables**: Ensure all required env vars are set in Vercel dashboard

## 🔧 Key Design Decisions

### 1. Database Schema
- **Embedded cities in User model** for simplicity and atomic operations
- **Minimal data storage** - only essential city info and favorites
- **Indexed email field** for fast user lookups

### 2. API Design
- **RESTful endpoints** with clear resource separation
- **Consistent error handling** across all routes
- **Rate limiting** to prevent API abuse
- **CORS configuration** for secure cross-origin requests

### 3. Frontend Architecture
- **Redux Toolkit** for reduced boilerplate
- **TypeScript** for type safety and better DX
- **Component composition** for reusability
- **Custom hooks** for Redux integration

### 4. Security Measures
- **Helmet.js** for security headers
- **Input validation** on both client and server
- **Password hashing** with salt rounds
- **JWT token expiration** handling

## 🌟 Features Implemented

### Core Requirements ✅
- [x] User authentication and authorization
- [x] Multi-city weather dashboard
- [x] Favorites functionality
- [x] Data isolation between users
- [x] Responsive UI with Tailwind CSS
- [x] Error handling and loading states

### Bonus Features ✅
- [x] AI weather insights using OpenAI
- [x] Travel recommendations agent
- [x] Smart favorites system (creative feature)
- [x] Real-time weather data
- [x] City search functionality

## 🚧 Known Limitations

1. **Weather API Rate Limits**: Using free OpenWeatherMap API with rate limits
2. **No Offline Support**: Requires internet connection for all features
3. **Basic Error Recovery**: Could implement retry mechanisms
4. **No Weather Alerts**: Could add severe weather notifications
5. **Limited Forecast**: Currently shows current weather only

## 🔮 Future Enhancements

1. **Weather Forecasts**: 5-day forecast display
2. **Weather Alerts**: Push notifications for severe weather
3. **Data Visualization**: Charts for temperature trends
4. **Social Features**: Share weather updates
5. **Mobile App**: React Native version
6. **Offline Support**: PWA capabilities

## 📱 Application Flow

1. **Registration/Login** → JWT token stored
2. **Dashboard Access** → Fetch user's cities
3. **Add Cities** → Search and add with coordinates
4. **Weather Display** → Real-time data for each city
5. **AI Insights** → On-demand weather analysis
6. **Favorites Management** → Toggle and organize cities
7. **Travel Tips** → AI recommendations for all cities

## 🧪 Testing the Application

### Test User Journey:
1. Register a new account
2. Add cities (try: "London", "Tokyo", "New York")
3. Mark some cities as favorites
4. Click "Get AI Insights" on weather cards
5. Use "Travel Tips" for AI recommendations
6. Test logout and login functionality

### API Endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/cities` - Get user cities
- `POST /api/cities` - Add new city
- `PATCH /api/cities/:id/favorite` - Toggle favorite
- `GET /api/weather/current/:lat/:lon` - Get weather
- `POST /api/ai/insights` - Get AI insights

---

**Built with ❤️ using React.js + Redux and Express.js**