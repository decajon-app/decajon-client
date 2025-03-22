import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { getUserData } from '../storage/UserStorage';
import { getToken } from '../storage/AuthStorage';
import { getLaunchData } from '../storage/LaunchStorage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false); // Estado de visibilidad del menú
  const slideAnim = useRef(new Animated.Value(300)).current; // Animación del menú

  const [userName, setUserName] = useState<string>('Nombre de usuario');


  const groupName = 'Nombre del grupo';
  const songName = 'Nombre de la canción';
  const songDetails = 'Compositor/Cantante';

  const newEvent = () => {
    console.log('New Event Functions');
    console.log('New Event');
    console.log('CreateEvent');
  };

  const openCalendar = () => {
    console.log('Opening Calendar');
  };

  const goHome = () => {
    console.log('Going to home');
    console.log("EL VERDADERO USER: ", getUserData());
    console.log("EL VERDADERO TOKEN: ", getToken());
  };

  const goProfile = () => {
    console.log('Going to profile');
  };

  const goEditInformation = () => {
    console.log('Going to edit information');
  };

  const goNewGroup = () => {
    navigation.navigate('WelcomeScreen');
  };

  const logOut = () => {
    console.log('logout');
    navigation.navigate('LoginScreen');
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

  useEffect(() => {
    const getUserName = async () => {
      const userData = await getUserData();
      setUserName(userData.firstName);
    }
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>¡Hola, {userName}!</Text>

        <TouchableOpacity style={styles.newEventButton} onPress={newEvent}>
          <Text style={styles.newEventText}>Nuevo Evento</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
          <View style={styles.cardEvent}>
            <Icon style={styles.iconCard} name="thumb-up" size={40} color="black" />
            <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
          <View style={styles.card}>
            <Text style={styles.groupName}>{groupName}</Text>
            <Text style={styles.songTitle}>{songName}</Text>
            <Text style={styles.songDetails}>{songDetails}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={goHome}>
          <Icon name="home-filled" size={30} color="black" />
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={openCalendar}>
          <Icon name="calendar-month" size={30} color="black" />
          <Text style={styles.footerText}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={toggleMenu}>
          <Icon name="menu" size={30} color="black" />
          <Text style={styles.footerText}>Menú</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <Animated.View style={[styles.menu, { left: slideAnim }]}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Icon style={styles.closeButtonText} name="close" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={goProfile}>
            <Text style={styles.menuText}>Mi Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={goEditInformation}>
            <Text style={styles.menuText}>Editar Información</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={goNewGroup}>
            <Text style={styles.menuText}>Nuevo Grupo</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem} onPress={logOut}>
            <Text style={styles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EDE1',
    padding: 20,
  },
  content: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    color: '#4A4A4A',
  },
  newEventButton: {
    backgroundColor: '#4A1900',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  newEventText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  card: {
    backgroundColor: '#FDF4E9',
    borderRadius: 10,
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardEvent: {
    backgroundColor: '#FDF4E9',
    borderRadius: 10,
    paddingVertical: 60,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Asegúrate de que el contenido esté centrado
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  iconCard: {
    textAlign: 'center',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 5,
    textAlign: 'right',
  },
  songTitle: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  songDetails: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F6EDE1',
    borderTopWidth: 1,
    borderColor: '#EDC8A7',
    paddingTop: 15,
  },
  footerItem: {
    alignItems: 'center',
    color: 'black',
  },
  footerText: {
    fontSize: 12,
    color: 'black',
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    marginLeft: 100,
    paddingTop: 50,
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    fontSize: 18,
    color: '#4A4A4A',
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 40,
  },
  closeButtonText: {
    color: '#4A1900',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 480,
  },
});

export default Home;