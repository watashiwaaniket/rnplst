import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { getApiUrl, API_CONFIG } from '@/config/api';

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
}

export default function HomeScreen() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.VIDEOS));
        setVideos(response.data.videos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch videos');
        setLoading(false);
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <>
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.videoItem}
          onPress={() => router.push({
            pathname: '/video-player',
            params: {
              videoId: item.id,
              title: item.title,
              channel: item.channel
            }
          })}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.channel}>{item.channel}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
    />
    <View style={{paddingBottom: 62}} />
    </>
  );
}

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  errorText: { 
    color: 'red', 
    fontSize: 16 
  },
  videoItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: { 
    width: 100, 
    height: 60, 
    borderRadius: 5 
  },
  textContainer: { 
    flex: 1, 
    marginLeft: 10 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  channel: { 
    fontSize: 14, 
    color: '#666' 
  },
  list: { 
    paddingBottom: 20 
  },
});
