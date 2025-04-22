import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getToken } from '../storage/AuthStorage';


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


// Stack para la navegacion del boton 'Inicio' en el BottomTab
function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Screens.HomeScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}


// Stack para la navegación del botón 'Grupos' en el BottomTab
function GroupsStackNavigator() {
    return (
        <GroupsStack.Navigator>
            <GroupsStack.Screen name="Groups" component={Screens.GroupsScreen} options={{ headerShown: false }} />
            <GroupsStack.Screen name="CreateGroup" component={Screens.CreateGroup} options={{ headerShown: false }} />
            <GroupsStack.Screen name="GroupInformation" component={Screens.GroupInformation} options={{ headerShown: false }} />
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


// Stack que contiene el BottomTabNavigator
function BottomTabNavigator() {
    return (
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
          component={HomeStackNavigator}
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

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name="Welcome" component={BottomTabNavigator} />
                </AppStack.Navigator>
            ) : (
                <AuthStackNavigator onLoginSuccess={handleLoginSuccess} />
            )}
        </NavigationContainer>
    );
}