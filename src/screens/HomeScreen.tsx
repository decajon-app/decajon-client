import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Animated, Dimensions, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import getChatbotResponse from '../utils/chatbotResponses';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [showAIScreen, setShowAIScreen] = useState<boolean>(false); // Estado para controlar la pantalla de IA
  const [showCalendarScreen, setShowCalendarScreen] = useState<boolean>(false); // Estado para controlar la pantalla del calendario
  const [messages, setMessages] = useState<Message[]>([]); // Estado para almacenar los mensajes del chat
  const [inputText, setInputText] = useState<string>(''); // Estado para almacenar el texto del input
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const userName = 'Juan Manuel';
  const groupName = 'Nombre del grupo';
  const songName = 'Nombre de la canción';
  const songDetails = 'Compositor/Cantante';

  const openAi = () => {
    setShowAIScreen(true); // Mostrar la pantalla de IA
    setShowCalendarScreen(false); // Ocultar la pantalla del calendario
  };

  const openGroups = () => {
    navigation.navigate('MyGroups'); 
  }

  const goHome = () => {
    setShowAIScreen(false); // Mostrar la pantalla de inicio
    setShowCalendarScreen(false); // Ocultar la pantalla del calendario
  };

  const openCalendar = () => {
    setShowCalendarScreen(true); // Mostrar la pantalla del calendario
    setShowAIScreen(false); // Ocultar la pantalla de IA
  };

  const addSection = () => {
    navigation.navigate('WelcomeScreen');
  };

  const newEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const goProfile = () => {
    console.log('Going to profile');
  };

  const goEditInformation = () => {
    console.log('Going to edit information');
  };

  const goNewGroup = () => {
    navigation.navigate('CreateGroup');
  };

  const logOut = () => {
    navigation.navigate('LoginScreen');
  };

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').width,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.90,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const closeMenu = () => {
    if (menuVisible) {
      toggleMenu();
    }
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Respuesta automática del chatbot
      setTimeout(() => {
        const nextRehearsalDate = '2024-12-31'; 
        const botResponse = getChatbotResponse(
          inputText, userName, groupName, songName, 
          songDetails, nextRehearsalDate, [''], '', '');
        const botMessage: Message = {
          id: messages.length + 2,
          text: botResponse,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, { transform: [{ scale: scaleAnim }] }]}>
        {showAIScreen ? (
          // Pantalla de IA
          <View style={{ flex: 1, padding: 10, margin: -20 }}>
            {messages.length === 0 && (
              <View style={styles.centeredView}> 
                <Icon name="auto-awesome" size={100} color="#4A1900" />
                <Text style={styles.centeredText}>¿En qué te puedo ayudar?</Text>
              </View>
            )}
            <ScrollView ref={scrollViewRef} style={{ marginBottom: 80 }}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={{
                    backgroundColor: message.sender === 'user' ? '#4A1900' : 'white',
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#4A1900',
                    borderRadius: 15,
                    borderBottomRightRadius: message.sender === 'user' ? 0 : 15,
                    borderBottomLeftRadius: message.sender === 'bot' ? 0 : 15,
                    padding: 10,
                    position: 'relative',
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: message.sender === 'user' ? 'white' : 'black',
                      paddingRight: message.sender === 'user' ? 40 : 0,
                      paddingLeft: message.sender === 'bot' ? 40 : 0,
                    }}
                  >
                    {message.text}
                  </Text>
                  <Icon
                    name={message.sender === 'user' ? 'person' : 'auto-awesome'}
                    size={20}
                    color={message.sender === 'user' ? '#4A1900' : 'white'}
                    style={{
                      position: 'absolute',
                      right: message.sender === 'user' ? 10 : 'auto',
                      left: message.sender === 'bot' ? 10 : 'auto',
                      bottom: 6,
                      backgroundColor: message.sender === 'user' ? 'white' : '#4A1900',
                      borderWidth: 1,
                      borderColor: message.sender === 'user' ? 'white' : '#4A1900',
                      borderRadius: 50,
                      padding: 5,
                    }}
                  />
                </View>
              ))}
            </ScrollView>
            {/* Escribir mensaje */}
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                left: 10,
                right: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 50,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                }}
              >
                <Icon name="auto-mode" size={25} color="#4A1900" style={{ marginRight: 5 }} onPress={() => setMessages([])} />
                <TextInput
                  style={{ fontSize: 18, flex: 1, color: 'black' }}
                  placeholder="Escríbe..."
                  placeholderTextColor="#999"
                  value={inputText}
                  onChangeText={handleInputChange}
                  onSubmitEditing={sendMessage}
                  multiline
                />
                <TouchableOpacity onPress={sendMessage}>
                  <Icon name="send" size={25} color="#4A1900" style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : showCalendarScreen ? (
          // Pantalla del calendario
          <View style={{ flex: 1, padding: 10, margin: -20 }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
              <View style={styles.cardEvent}>
                <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
                <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
              </View>
            </View>
          </View>
        ) : (
          // Pantalla de inicio
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Image source={require('../assets/logo.png')}
              style={{ width: 150, height: 50, alignSelf: 'flex-start', marginBottom: -20 }} 
            />
            <Text style={styles.greeting}>¡Hola, {userName}!</Text>
            <TouchableOpacity style={styles.newEventButton} onPress={openGroups}>
              <Icon style={styles.iconCard} name="people" size={40} color="white" />
              <Text style={styles.newEventText}>Mis grupos</Text>
            </TouchableOpacity>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
              {/* <View style={styles.card}>
                <Text style={styles.groupName}>{groupName}</Text>
                <Text style={styles.songTitle}>{songName}</Text>
                <Text style={styles.songDetails}>{songDetails}</Text>
              </View> */}
              <View style={styles.card}>
                <Text style={styles.groupName}>Mariachi</Text>
                <Text style={styles.songTitle}>El Rey</Text>
                <Text style={styles.songDetails}>Vicente Fernández</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.groupName}>Mariachi</Text>
                <Text style={styles.songTitle}>Cielito Lindo</Text>
                <Text style={styles.songDetails}>Pedro Infante</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.groupName}>Mariachi</Text>
                <Text style={styles.songTitle}>La Bikina</Text>
                <Text style={styles.songDetails}>Luis Miguel</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.groupName}>Mariachi</Text>
                <Text style={styles.songTitle}>Volver Volver</Text>
                <Text style={styles.songDetails}>Vicente Fernández</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
              <View style={styles.cardEvent}>
                <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
                <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
              </View>
            </View>
          </ScrollView>
        )}
      </Animated.View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={goHome}>
          <Icon name="home-filled" size={35} color="#4A1900" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={openCalendar}>
          <Icon name="calendar-month" size={35} color="#4A1900" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={addSection}>
          <Icon name="add-circle" size={55} color="#4A1900" style={{ margin: -10 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={openAi}>
          <Icon name="auto-awesome" size={35} color="#4A1900" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={toggleMenu}>
          <Icon name="menu" size={35} color="#4A1900" />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayAnim }]}>
          <TouchableOpacity style={styles.overlayTouchable} onPress={closeMenu} activeOpacity={1} />
        </Animated.View>
      )}
      <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Icon style={styles.closeButtonText} name="close" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={goProfile}>
          <Icon
            name="person"
            size={25}
            color="white"
            style={{
              padding: 5,
              marginRight: 10,
              backgroundColor: '#4A1900',
              borderRadius: 50,
            }}
          />
          <Text style={styles.menuText}>Mi Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={goEditInformation}>
          <Icon
            name="edit"
            size={25}
            color="white"
            style={{
              padding: 5,
              marginRight: 10,
              backgroundColor: '#4A1900',
              borderRadius: 50,
            }}
          />
          <Text style={styles.menuText}>Editar Información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={goNewGroup}>
          <Icon
            name="add"
            size={25}
            color="white"
            style={{
              padding: 5,
              marginRight: 10,
              backgroundColor: '#4A1900',
              borderRadius: 50,
            }}
          />
          <Text style={styles.menuText}>Nuevo Grupo</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={logOut}>
          <Text style={styles.menuText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EDE1',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    color: '#4A1900',
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
    color: '#4A1900',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardEvent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 60,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
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
    color: '#4A1900',
    marginBottom: 5,
    textAlign: 'right',
  },
  songTitle: {
    fontSize: 16,
    color: '#4A1900',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  songDetails: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#4A1900',
    padding: 10,
    marginBottom: -20,
    marginHorizontal: -20,
    position: 'relative',
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
    marginLeft: 100,
    paddingTop: 50,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 20,
    color: '#4A1900',
    fontWeight: 'bold', 
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
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  overlayTouchable: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  centeredText: {
    fontSize: 20,
    color: '#4A1900',
    textAlign: 'center',
    marginTop: 20,
    padding: 5,
  }
});

export default Home;