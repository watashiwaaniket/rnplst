import mongoose from "mongoose"
import envConfig from "../lib/env.config"

export const connectDB = async (): Promise<void> => {
    try {
        if (!envConfig.MongoDBUrl) {
            throw new Error('MongoDB URL is not configured. Please check your environment variables.')
        }
        
        // Add connection options for better error handling
        await mongoose.connect(envConfig.MongoDBUrl, {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('MongoDB connection failed:', errorMessage)
        
        // More detailed error logging
        if (error instanceof Error) {
            if (error.message.includes('authentication failed')) {
                console.error('Authentication failed. Please check your username and password in the connection string.')
            } else if (error.message.includes('ENOTFOUND')) {
                console.error('Host not found. Please check your MongoDB host URL.')
            } else if (error.message.includes('ECONNREFUSED')) {
                console.error('Connection refused. Please check if MongoDB is running and accessible.')
            }
        }
        
        process.exit(1)
    }
}

const videoSchema = new mongoose.Schema({videoId: String});
export const Video = mongoose.model('Video', videoSchema);