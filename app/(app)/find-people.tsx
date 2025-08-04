import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Traveler {
  id: string;
  name: string;
  location: string;
  image: string;
  interests: string[];
}

export default function FindPeopleScreen() {
  const router = useRouter();
  const [travelers, setTravelers] = useState<Traveler[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      location: 'Singapore',
      image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
      interests: ['Hiking', 'Photography', 'Food'],
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      location: 'Spain',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      interests: ['Surfing', 'Music', 'History'],
    },
    {
      id: '3',
      name: 'Priya Patel',
      location: 'India',
      image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg',
      interests: ['Yoga', 'Spirituality', 'Art'],
    },
  ]);

  const handleConnect = (id: string) => {
    // Handle connect logic
    console.log('Connect with:', id);
  };

  const renderItem = ({ item }: { item: Traveler }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardLocation}>📍 {item.location}</Text>
        <View style={styles.interestsContainer}>
          {item.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => handleConnect(item.id)}
        >
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Travel Buddies</Text>
      <Text style={styles.subtitle}>Connect with like-minded travelers</Text>
      
      <FlatList
        data={travelers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 24,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardLocation: {
    color: '#b0b0b0',
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  interestTag: {
    backgroundColor: '#3d3d3d',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: 'white',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#4dabf7',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});