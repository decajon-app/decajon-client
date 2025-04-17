import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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


            {/* Linea a cambiar para ver pantalla inicial */}

            {/* <AuthStack.Screen name="Preview" component={Screens.PreviewScreen} /> */}
            <AuthStack.Screen name="Home" component={Screens.HomeScreen} />


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
            screenOptions={() => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
              })}
        >
            <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Inicio' }} />
            <Tab.Screen name="GroupsTab" component={GroupsStackNavigator} options={{ title: 'Grupos', }} />
            <Tab.Screen name="ChatbotTab" component={ChatbotStackNavigator} options={{ title: 'Chatbot', }} />
        </Tab.Navigator>     
    );
}


// Componente de navegación principal
export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Checar si existe un token para logearlo automaticamente
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






























