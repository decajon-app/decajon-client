import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text, View, TouchableOpacity, ScrollView, Image, Animated, Alert, Modal, ActivityIndicator } from 'react-native';
import { useCallback, useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getToken } from '../storage/AuthStorage';
import { removeToken } from '../storage/AuthStorage';
import { getUserData } from '../storage/UserStorage';
import Header from '../components/Header/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import de todas las screens
import * as Screens from '../screens';

// Import de los tipos para la navegacion
import {
    AuthStackParamList,
    AppStackParamList,
    MainTabParamList,
    HomeStackParamList,
    GroupsStackParamsList,
    ChatbotStackParamsList,
    LoginScreenProps
} from '../types/navigation';
import styles from '../components/Header/Header.styles';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>(); 
const GroupsStack = createStackNavigator<GroupsStackParamsList>();
const ChatbotStack = createStackNavigator<ChatbotStackParamsList>();


// Stack para la navegación en la autenticación
function AuthStackNavigator({ onLoginSuccess }: { onLoginSuccess: () => void}) {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Preview" component={Screens.PreviewScreen} />
            <AuthStack.Screen 
                name="Login" 
                component={(props: LoginScreenProps) => (
                    <Screens.LoginScreen {...props} onLoginSuccess={onLoginSuccess} />
                )} 
            />
            <AuthStack.Screen name="CreateAccount" component={Screens.CreateAccount} />
            <AuthStack.Screen name="ForgotPassword" component={Screens.ForgotPassword} />
        </AuthStack.Navigator>
    );
}

interface HomeStackNavigatorProps {
  onLogout: () => void;
}
// Stack para la navegacion del boton 'Inicio' en el BottomTab
function HomeStackNavigator({ onLogout}: HomeStackNavigatorProps) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
              name="Home" 
              component={Screens.HomeScreen} 
              options={{ headerShown: false }}
              initialParams={{ onLogoutSuccess: onLogout }}
            />
            <HomeStack.Screen name="CreateEvent" component={Screens.CreateEventScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}


// Stack para la navegación del botón 'Grupos' en el BottomTab
function GroupsStackNavigator() {
    return (
        <GroupsStack.Navigator>
            <GroupsStack.Screen name="Groups" component={Screens.GroupsScreen} options={{ headerShown: false }} />
            <GroupsStack.Screen name="CreateGroup" component={Screens.CreateGroup} options={{ headerShown: false }} />
            <GroupsStack.Screen name="CreateEvent" component={Screens.CreateEvent} options={{ headerShown: false }} />
            <GroupsStack.Screen name="GroupInformation" component={Screens.GroupInformation} options={{ headerShown: false }} />
            <GroupsStack.Screen name="JoinGroup" component={Screens.JoinGroup} options={{ headerShown: false}} />
            <GroupsStack.Screen name="ViewGroup" component={Screens.ViewGroup} options={{ headerShown: false }} />
            <GroupsStack.Screen name="RepertoryScreen" component={Screens.RepertoryScreen} options={{ headerShown: false }} />
            <GroupsStack.Screen name="AddSong" component={Screens.AddSong} options={{ headerShown: false }} />
            <GroupsStack.Screen name="EditSong" component={Screens.EditSong} options={{ headerShown: false }} />
            <GroupsStack.Screen name="ViewSong" component={Screens.ViewSong} options={{ headerShown: false }} />
            <GroupsStack.Screen name="Members" component={Screens.Members} options={{ headerShown: false }} />
        </GroupsStack.Navigator>
    );
}


// Stack para la navegacion del botón 'Chatbot' en el BottomTab
function ChatbotStackNavigator() {
    return (
        <ChatbotStack.Navigator>
            <ChatbotStack.Screen name="Chatbot" component={Screens.ChatbotScreen} options={{ headerShown: false }} />
        </ChatbotStack.Navigator>
    );
}


// Necesario definir unas props, porque en este caso necesitamos recibir parametros en algunas pantallas
interface BottomTabNavigatorProps {
  route: {
    params?: {
      onLogoutSuccess?: () => void;
    }
  }
}
// Stack que contiene el BottomTabNavigator
function BottomTabNavigator({ route }: BottomTabNavigatorProps) {
  const { onLogoutSuccess } = route.params || {};
  const [loading, setLoading] = useState<boolean>(true); // estado para mostrar el spinner

  // Estados para el menú y el calendario
  const [menuVisible, setMenuVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [userName, setUserName] = useState<string>('Nombre de usuario');


  // Funciones para navegar a otras pantallas
  const goProfile = () => console.log('Going to profile');
  const goEditInformation = () => console.log('Going to edit information');

  const [loggingOut, setLoggingOut] = useState(false); // estado para mostrar el spinner

  const logOut = async () => {
      if (onLogoutSuccess) {
        try {
          setLoggingOut(true); // Mostrar el modal
          await removeToken();
          setTimeout(() => {
            setLoggingOut(false); // Ocultar el modal después de 2 segundos
            onLogoutSuccess();
          }, 2000);
        } catch (error) {
          setLoggingOut(false);
          Alert.alert("Hubo un error al tratar de cerrar la sesión.");
        }
      }
    };
  
    const toggleMenu = () => {
      if (menuVisible) {
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }).start(() => setMenuVisible(false));
      } else {
        setMenuVisible(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    };
  
    const toggleCalendar = () => {
      if (calendarVisible) {
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }).start(() => setCalendarVisible(false));
      } else {
        setCalendarVisible(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    };

    useEffect(() => {
        const getUserName = async () => {
          const userData = await getUserData();
          setUserName(userData.firstName);
        };
        getUserName();
    
        // Spinner visible por 3 segundos
        const timer = setTimeout(() => {
          setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);

  return (
    <>
      {/* Header global */}
      <Header toggleMenu={toggleMenu} toggleCalendar={toggleCalendar} />

      {/* Contenido del BottomTabNavigator */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
            backgroundColor: '#FFF7EE',
          },
          tabBarActiveTintColor: '#4A1900',
          tabBarInactiveTintColor: '#795548',
        }}
      >
      <Tab.Screen
        name="HomeTab"
        component={() => <HomeStackNavigator onLogout={onLogoutSuccess} />}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={40} />
          ),
          tabBarIconStyle: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
      <Tab.Screen
        name="GroupsTab"
        component={GroupsStackNavigator}
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="group" color={color} size={40} />
          ),
          tabBarIconStyle: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
      <Tab.Screen
        name="ChatbotTab"
        component={ChatbotStackNavigator}
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="smart-toy" color={color} size={40} />
          ),
          tabBarIconStyle: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
    </Tab.Navigator>

      {/* Menú */}
      {menuVisible && (
        <Animated.View style={[styles.menu, { right: slideAnim }]}>
          <ScrollView>
            <View style={styles.menuContent}>
              <View>
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                  <Icon style={styles.closeButtonText} name="close" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuTextName}>{userName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={goProfile}>
                  <Icon style={styles.iconMenu} name="person" size={25} color="black" />
                  <Text style={styles.menuText}>Mi Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={goEditInformation}>
                  <Icon style={styles.iconMenu} name="edit" size={25} color="black" />
                  <Text style={styles.menuText}>Editar Información</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.logOutItem} onPress={logOut}>
                <View style={styles.divider} />
                <Text style={styles.logOut}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {/* Calendario */}
      {calendarVisible && (
        <Animated.View style={[styles.calendar, { left: slideAnim }]}>
          <ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={toggleCalendar}>
              <Icon style={styles.closeButtonText} name="close" size={40} color="black" />
            </TouchableOpacity>
            
            <Text style={styles.calendarTitle}>MI CALENDARIO</Text>
            
            {/* Nombre del mes actual */}
            <TouchableOpacity>
              <Text style={styles.calendarTitle}>
                {'<'}
                {'     '}
                {new Date().toLocaleString('es-ES', { month: 'long' }).toUpperCase()}
                {' '}
                {new Date().getFullYear()}
                {'     '}
                {'>'}
              </Text>
            </TouchableOpacity>


            {/* Días de la semana */}
            <View style={styles.calendarDays}>
              <Text style={styles.calendarDay}>L</Text>
              <Text style={styles.calendarDay}>M</Text>
              <Text style={styles.calendarDay}>I</Text>
              <Text style={styles.calendarDay}>J</Text>
              <Text style={styles.calendarDay}>V</Text>
              <Text style={styles.calendarDay}>S</Text>
              <Text style={styles.calendarDay}>D</Text>
            </View>

            {/* Ejemplo de días del mes */}
            <View style={styles.calendarGrid}>
              {Array.from({ length: 31 }).map((_, index) => (
                <TouchableOpacity key={index} style={styles.calendarDate}>
                  <Text style={styles.dateText}>{index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}



      {/* Modal de cierre de sesion */}
      {loggingOut && (
        <Modal
        transparent
        visible={loggingOut}
        animationType="fade"
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <ActivityIndicator size="large" color="#4A1900" />
            <Text style={{ 
              marginTop: 10, 
              fontSize: 18, 
            }}>Cerrando sesión...</Text>
          </View>
        </View>
      </Modal>
      
      )}




    </>
  );
}

  


// Componente de navegación principal
export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getAccessToken = async () => {
            const token = await getToken();
            if (token !== null) {
                setIsLoggedIn(true);
            }
        }
        getAccessToken();
    }, []);

    const handleLoginSuccess = useCallback(() => {
      setIsLoggedIn(true);
    }, []);

    const handleLogoutSuccess = useCallback(() => {
      setIsLoggedIn(false);
    }, []);

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen 
                      name="Welcome" 
                      component={BottomTabNavigator} 
                      initialParams={{ onLogoutSuccess: handleLogoutSuccess }}
                    />
                </AppStack.Navigator>
            ) : (
                <AuthStackNavigator onLoginSuccess={handleLoginSuccess} />
            )}
        </NavigationContainer>
    );
}
