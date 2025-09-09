export default {
    Port: process.env.PORT ?? '3000',
    MongoDBUrl: process.env.DATABASE_URL ?? '',
    YoutubeAPIKey: process.env.YOUTUBE_API_KEY ?? ''
}