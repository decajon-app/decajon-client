import React, { useState, useRef, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Text, View, TouchableOpacity, ScrollView, Image, Animated, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from '../../storage/UserStorage';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation';
import { RepertoireSongCardDto } from '../../models/RepertoireDto';
import { fetchSuggestionsPractice } from '../../api/RepertoireApi'

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [loggingOut, setLoggingOut] = useState(false); // estado para mostrar el spinner
  const [suggestedPractices, setSuggestedPractices] = useState<RepertoireSongCardDto[]>([]);
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
      try {
        const data = await fetchSuggestionsPractice('');
        setSuggestedPractices(data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los ensayos sugeridos.");
      } finally {
        setLoadingPractices(false);
      }
    };
  
    loadPractices();
  }, []);
  return (

    <View style={styles.container}>
      {/* Modal para logout */}
      <Modal transparent visible={loggingOut} animationType="fade">
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <ActivityIndicator size="large" color="#4A1900" />
            <Text style={{ marginTop: 10 }}>Cerrando sesión...</Text>
          </View>
        </View>
      </Modal>

      {/* FlatList principal */}
      <FlatList
        data={suggestedPractices}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        
        // Encabezado
        ListHeaderComponent={
          <>
            <Text style={styles.greeting}>¡Hola, {userName}!</Text>

            <TouchableOpacity style={styles.newEventButton} onPress={newEvent}>
              <Text style={styles.newEventText}>Nuevo Evento</Text>
            </TouchableOpacity>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
              {loadingPractices && (
                <ActivityIndicator color="#4A1900" />
              )}
            </View>
          </>
        }

        // Elementos
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.card}>
              <View style={styles.cardIcon}>
                <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.groupName}>{item.id}</Text>
                <Text style={styles.songTitle}>{item.song}</Text>
                <Text style={styles.songDetails}>{item.artist}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        // Si no hay prácticas
        ListEmptyComponent={
          !loadingPractices ? (
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>
              No hay ensayos sugeridos.
            </Text>
          ) : null
        }

        // Pie de lista
        ListFooterComponent={
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
            <TouchableOpacity>
              <View style={styles.cardEvent}>
                <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
                <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
