import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Itinerary {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
}

export default function ItinerariesScreen() {
  const router = useRouter();
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: '1',
      title: 'Bali Adventure',
      location: 'Bali, Indonesia',
      duration: '7 days',
      price: '1200',
      image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    },
    {
      id: '2',
      title: 'European Tour',
      location: 'Multiple Countries',
      duration: '14 days',
      price: '2500',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    },
    {
      id: '3',
      title: 'Japan Discovery',
      location: 'Japan',
      duration: '10 days',
      price: '1800',
      image: 'https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg',
    },
  ]);

  const handleViewDetails = (id: string) => {
    router.push(`/itineraries/${id}`);
  };

  const renderItem = ({ item }: { item: Itinerary }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleViewDetails(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardLocation}>📍 {item.location}</Text>
          <Text style={styles.cardDuration}>⏳ {item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Itineraries</Text>
      <Text style={styles.subtitle}>Plan your next adventure</Text>
      
      <FlatList
        data={itineraries}
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
    height: 180,
  },
  priceTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#4dabf7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLocation: {
    color: '#b0b0b0',
  },
  cardDuration: {
    color: '#b0b0b0',
  },
});