import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Text, View, TouchableOpacity, ScrollView, Image, Animated, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from '../../storage/UserStorage';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation';
import { SuggestionCardDto } from '../../models/RepertoireDto';
import { getSuggestionsByUserId } from '../../api/RepertoireApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false); // estado para mostrar el spinner
  
  const [suggestedPractices, setSuggestedPractices] = useState<SuggestionCardDto[]>([]);
  const [events, setEvents] = useState<SuggestionCardDto[]>([]);

  const handleViewSong = (songId: number) => {
    navigation.navigate('ViewSong', { songId: songId });
  };

  const formatDate = (isoString: string): string => {
    const cleanDate = isoString.replace(/\[.*\]/, '');
    const date = new Date(cleanDate);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  useEffect(() => {
    const getUserName = async () => {
      const userData = await getUserData();
      setUserName(userData.firstName);
      setUserId(userData.id);
    };
    getUserName();
  }, []);

  useEffect(() => {
    const loadPractices = async () => {
      if (userId === null) return;
  
      try {
        const data = await getSuggestionsByUserId(userId);
        setSuggestedPractices(data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los ensayos sugeridos.");
      } 
    };
    loadPractices();
  }, [userId]);  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        {userName !== '' && <Text style={styles.greeting}>¡Hola, {userName}!</Text>}
        {suggestedPractices.length !== 0 && <Text style={styles.sectionTitle}>Estas canciones vencen pronto</Text>}
        <FlatList
          data={suggestedPractices}
          keyExtractor={(item) => item.repertoireId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleViewSong(item.repertoireId)}>
              <View style={styles.card}>
                <View style={styles.cardIcon}>
                  <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                </View>
                <View style={styles.cardContainer}>
                  <Text style={styles.groupName}>{item.title}</Text>
                  <Text style={styles.songTitle}>{item.artist}</Text>
                  <Text style={styles.songDetails}>{item.group}</Text>
                  <Text style={styles.songDetails}>{formatDate(item.dueDate)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#763F0E' }}>
                  No hay nada por ensayar... aún
                </Text>
            </View>
          }
        />
        {events.length !== 0 && <Text style={styles.sectionTitle}>Tus eventos próximos</Text>}
      </View>

      <Modal
        transparent
        visible={loggingOut}
        animationType="fade"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <ActivityIndicator size="large" color="#4A1900" />
            <Text style={{ marginTop: 10 }}>Cerrando sesión...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
