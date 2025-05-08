import React, { useState, useRef, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Text, View, TouchableOpacity, ScrollView, Image, Animated, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from '../../storage/UserStorage';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation';
import { SuggestionCardDto } from '../../models/RepertoireDto';
import { fetchSuggestionsPractice } from '../../api/RepertoireApi'

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false); // estado para mostrar el spinner
  const [suggestedPractices, setSuggestedPractices] = useState<SuggestionCardDto[]>([]);
  const [loadingPractices, setLoadingPractices] = useState(true);
  const newEvent = () => navigation.navigate('CreateEvent');

  useEffect(() => {
    const getUserName = async () => {
      const userData = await getUserData();
      setUserName(userData.firstName);
    };
    getUserName();

    // Spinner visible por 3 segundos
    const timer = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadPractices = async () => {
      if (userId === null) return;
  
      try {
        const data = await fetchSuggestionsPractice(userId);
        setSuggestedPractices(data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los ensayos sugeridos.");
      } finally {
        setLoadingPractices(false);
      }
    };
  
    loadPractices();
  }, [userId]);
  
  return (

    <View style={styles.container}>
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

      {/* Contenido */}
        <Text style={styles.greeting}>¡Hola, {userName}!</Text>

        <TouchableOpacity style={styles.newEventButton} onPress={newEvent}>
          <Text style={styles.newEventText}>Nuevo Evento</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
          <TouchableOpacity>
            <View style={styles.card}>
              <View style={styles.cardIcon}>
                <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.groupName}>group name</Text>
                <Text style={styles.songTitle}>song title</Text>
                <Text style={styles.songDetails}>song details</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <FlatList
            data={suggestedPractices}
            keyExtractor={(item) => item.repertoireId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardEvent}>
                <Icon style={styles.iconCard} name="music-note" size={40} color="#4A1900" />
                <View>
                  <Text style={styles.cardText}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.artist}</Text>
                  <Text style={styles.cardText}>{item.group}</Text>
                  <Text style={styles.cardText}>{item.dueDate}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>


    </View>
  );
};

export default HomeScreen;
