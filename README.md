# Learnoverse

A simple rn app to display 10 youtube videos populated with youtube api

## Folder Structure

```
rnplst/
├── client/                 # React Native Expo app
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx   # Video list screen
│   │   │   └── _layout.tsx # Tab navigation
│   │   ├── video-player.tsx # Video player screen
│   │   └── _layout.tsx     # Main app layout
│   ├── config/
│   │   └── api.ts          # API configuration
│   ├── components/         # Reusable components
│   └── package.json
├── server/                 # Backend API server
│   ├── db/
│   │   └── db.ts          # Database connection
│   ├── lib/
│   │   └── env.config.ts  # Environment configuration
│   ├── index.ts           # Main server file
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (for server runtime)
- **Expo CLI** (`npm install -g @expo/cli`)
- **MongoDB Atlas** account (or local MongoDB)
- **YouTube Data API v3** key

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rnplst
```

### 2. Backend Setup

```bash
cd server
bun install
```

copy `.env.example` as `.env` and populate it

Start the server:
```bash
bun index.ts
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the Expo development server:
```bash
npm start
```

## Running the Application

### Start Backend Server
```bash
cd server
bun index.ts
```
Server will run on `http://localhost:3000`

### Start Frontend App
```bash
cd client
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your phone

## API Endpoints

### GET /videos
Returns enriched video data with YouTube metadata.

**Response:**
```json
{
  "videos": [
    {
      "id": "9YffrCViTVk",
      "title": "Embed a YouTube Video in HTML and Make it Responsive",
      "channel": "Clicks to Clients",
      "thumbnail": "https://i.ytimg.com/vi/9YffrCViTVk/default.jpg",
      "duration": "PT3M"
    }
  ]
}
```
