# Video Playlist App

A React Native Expo app that displays a list of videos and allows in-app video playback.

## Features

- **Video List Screen**: Displays all videos in a scrollable list with thumbnails, titles, channels, and durations
- **Video Player Screen**: Plays YouTube videos directly within the app using WebView
- **Responsive Design**: Clean, modern UI with proper loading states and error handling

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Make sure your backend server is running on `http://localhost:3000`

## API Configuration

The app expects the backend API to be running on `http://localhost:3000`. You can modify this in `config/api.ts`.

## Screens

### Video List Screen (`app/(tabs)/index.tsx`)
- Fetches videos from the backend API
- Displays videos in a scrollable list
- Shows video thumbnails, titles, channels, and formatted durations
- Handles loading states and errors

### Video Player Screen (`app/video-player.tsx`)
- Plays YouTube videos using WebView
- Full-screen video player with custom header
- Back navigation to return to video list
- Handles video loading and errors

## Navigation

The app uses Expo Router for navigation:
- Tab navigation for the main video list
- Stack navigation for the video player screen

## Dependencies

- `expo-router`: File-based routing
- `react-native-webview`: For in-app video playback
- `axios`: HTTP client for API calls
- `@expo/vector-icons`: Icons for the UI