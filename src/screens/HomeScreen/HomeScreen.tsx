import React, { useState, useRef, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Text, View, TouchableOpacity, ScrollView, Image, Animated, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from '../../storage/UserStorage';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation';
import { SuggestionCardDto } from '../../models/RepertoireDto';
import { getSuggestionsByUserId } from '../../api/RepertoireApi'
import { ColorSpace } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false); // estado para mostrar el spinner
  const [suggestedPractices, setSuggestedPractices] = useState<SuggestionCardDto[]>([]);

  const handleViewSong = (songId: number) => {
    navigation.navigate('ViewSong', { songId: songId });
  };

  const handleViewSong = (songId: number) => {
    navigation.navigate('ViewSong', { songId: songId });
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
      } 
    };
    loadPractices();
  }, [userId]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        {userName !== '' && <Text style={styles.greeting}>¡Hola, {userName}!</Text>}
        <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
        <FlatList
          data={suggestedPractices}
          keyExtractor={(item) => item.repertoireId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cardEvent} onPress={() => handleViewSong(item.repertoireId)}>
              <Icon style={styles.iconCard} name="music-note" size={40} color="#4A1900" />
              <View>
                <Text style={styles.cardText}>{item.title}</Text>
                <Text style={styles.cardText}>{item.artist}</Text>
                <Text style={styles.cardText}>{item.group}</Text>
                <Text style={styles.cardText}>{item.dueDate}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
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

      {/* Contenido */}
        <Text style={styles.greeting}>¡Hola, {userName}!</Text>

        <TouchableOpacity style={styles.newEventButton} onPress={newEvent}>
          <Text style={styles.newEventText}>Nuevo Evento</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
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
