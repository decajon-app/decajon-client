import React, { useState, useRef, useEffect } from 'react';
import { styles } from './styles';
import { Text, View, TouchableOpacity, ScrollView, Image, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from '../../storage/UserStorage';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation';
import { removeToken } from '../../storage/AuthStorage';

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }: HomeScreenProps) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false); // Estado de visibilidad del menú
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false); // Estado de visibilidad del calendario
  const slideAnim = useRef(new Animated.Value(300)).current; // Animación del menú
  const [userName, setUserName] = useState<string>('Nombre de usuario');

  const { onLogoutSuccess } = route.params; // Para accionar el cierre de sesión desde la navegación

  const groupName = 'Nombre del grupo';
  const songName = 'Nombre de la canción';
  const songDetails = 'Compositor/Cantante';

  const newEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const goProfile = () => {
    console.log('Going to profile');
  };

  const goEditInformation = () => {
    console.log('Going to edit information');
  };

  const logOut = async () => {
    console.log("Antes del if");
    console.log(onLogoutSuccess);
    if (onLogoutSuccess) {
      console.log("Dentro del if");
      try {    
        await removeToken();
        onLogoutSuccess();
      } catch (error) {
        Alert.alert("Hubo un error al tratar de cerrar la sesión.");
      }
    }
  };

  const toggleMenu = () => {
    if (menuVisible) {
      console.log('closing menu');
      Animated.timing(slideAnim, {
        toValue: 300, // Fuera de la pantalla
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      console.log('opening menu');
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Visible en pantalla
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleCalendar = () => {
    if (calendarVisible) {
      console.log('closing calendar');
      Animated.timing(slideAnim, {
        toValue: 300, // Fuera de la pantalla
        duration: 300,
        useNativeDriver: false,
      }).start(() => setCalendarVisible(false));
    } else {
      console.log('opening calendar');
      setCalendarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Visible en pantalla
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    const getUserName = async () => {
      const userData = await getUserData();
      setUserName(userData.firstName);
    }
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="account-circle" size={50} color="#4A1900" />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <TouchableOpacity onPress={toggleCalendar}>
          <Icon name="calendar-month" size={50} color="#4A1900" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
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
                <Text style={styles.groupName}>{groupName}</Text>
                <Text style={styles.songTitle}>{songName}</Text>
                <Text style={styles.songDetails}>{songDetails}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
          <TouchableOpacity>
            <View style={styles.cardEvent}>
              <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
              <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {menuVisible && (
        <Animated.View style={[styles.menu, { right: slideAnim }]}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Icon style={styles.closeButtonText} name="close" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={goProfile}>
            <Text style={styles.menuText}>Mi Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={goEditInformation}>
            <Text style={styles.menuText}>Editar Información</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem} onPress={logOut}>
            <Text style={styles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {calendarVisible && (
        <Animated.View style={[styles.calendar, { left: slideAnim }]}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleCalendar}>
            <Icon style={styles.closeButtonText} name="close" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>Mi calendario</Text>
          <View style={styles.calendarDays}>
            <Text style={styles.calendarDay}>L</Text>
            <Text style={styles.calendarDay}>M</Text>
            <Text style={styles.calendarDay}>I</Text>
            <Text style={styles.calendarDay}>J</Text>
            <Text style={styles.calendarDay}>V</Text>
            <Text style={styles.calendarDay}>S</Text>
            <Text style={styles.calendarDay}>D</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeScreen;