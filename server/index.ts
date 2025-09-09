import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import { connectDB, Video } from './db/db';
import envConfig from './lib/env.config';

const app = express();
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos';

// Middleware
app.use(express.json());

// Initialize database connection
await connectDB();

app.get('/', (req, res) => {
    res.json({
        message : 'server is running'
    })
})

app.get('/videos', async (req, res) => {
    try{
        if(!envConfig.YoutubeAPIKey){
            throw new Error('Youtube API key not configured');
        }

        const videos = await Video.find().select('videoId');
        if(!videos.length){
            return res.json({
                message : 'No videos found in the database',
                videos: []
            })
        }

        const videoIds = videos.map((v) => v.videoId).join(',');
        const response = await axios.get(YOUTUBE_API_URL, {
            params: {
                part: 'snippet,contentDetails',
                id: videoIds,
                key: envConfig.YoutubeAPIKey,
            },
            timeout: 30000,
        });

        const ytData = response.data;
        if(ytData.error){
            throw new Error(`Youtube API error: ${ytData.error.message}`)
        }

        const enrichedVideos = ytData.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.default.url,
            duration: item.contentDetails.duration,
        }))

        res.json({
            videos: enrichedVideos,
        })
    } catch (error){
        console.error('Error in /videos: ', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({
            error: `Error fetching videos: ${errorMessage}`
        })
    }
})

app.listen(envConfig.Port, () => {
    console.log(`Express server is running on port ${envConfig.Port}`)
})