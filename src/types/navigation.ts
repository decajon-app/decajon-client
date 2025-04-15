/**
 * Navigation.tsx
 */
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { GroupDto } from "../models";


/**
 * AuthStack typos
 * Aquí declaramos las patanllas que corresponden
 * a la autenticación, tales como:
 * - Pantalla de logeo
 * - Pantalla de crear una cuenta
 * - Pantalla de contraseña olvidada
 * - etc
 * 
 * Si es necesario agregar una pantalla o parámetro
 * que esté relacionado con toda la lógica que va
 * antes del funcionamiento de la aplicación
 * (antes de que el usuario inicie sesión),
 * agregarla aquí.
 */
export type AuthStackParamList = {
    Login: undefined;
    CreateAccount: undefined;
    ForgotPassword: undefined;
    ResetPassword: undefined;
    Preview: undefined;
};
// Crear un type por cada una de las pantallas definidas arriba
// pasando el AuthStack y el nombre de la screen
export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type CreateAccountScreenProps = StackScreenProps<AuthStackParamList, 'CreateAccount'>;
export type ForgotPasswordScreenProps = StackScreenProps<AuthStackParamList, 'ForgotPassword'>;
export type ResetPasswordScreenProps = StackScreenProps<AuthStackParamList, 'ResetPassword'>;
export type PreviewScreenProps = StackScreenProps<AuthStackParamList, 'Preview'>;
/// -----------------------------------------------------------------


/**
 * MainTab typos
 * Aquí declaramos las patantallas que van
 * en la barra de navegación inferior
 * - Inicio
 * - Grupos
 * - Chatbot
 * 
 * Si se llega a agregar un nuevo botón en la barra de 
 * navegación inferior, agregarla a la lista y crear sus ScreenPros
 * como está mostrado abajo.
 */
export type MainTabParamList = {
    HomeTab: undefined;
    GroupsTab: undefined;
    ChatbotTab: undefined;
};
// Crear type por cada una de las pantallas
export type HomeTabScreenProps = BottomTabScreenProps<MainTabParamList, 'HomeTab'>;
export type GroupsTabScreenProps = BottomTabScreenProps<MainTabParamList, 'GroupsTab'>;
export type ChatbotTabScreenProps = BottomTabScreenProps<MainTabParamList, 'ChatbotTab'>;


// Ahora creamos los tipos de las pantallas que van en cada Tab
// Crear tipo de Home
export type HomeStackParamList = {
    Home: undefined;
    // Configuration?????
};
// Crear type por cada screen de HomeStack
export type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;


// Crear tipo de Grupos
export type GroupsStackParamsList = {
    Groups: undefined;
    CreateGroup: undefined;
    JoinGroup: undefined;
    GroupInformation: GroupDto;
};
// Crear type por cada screen de GroupsStack
export type GroupsScreenProps = StackScreenProps<GroupsStackParamsList, 'Groups'>;
export type CreateGroupScreenProps = StackScreenProps<GroupsStackParamsList, 'CreateGroup'>;
export type JoinInformationScreenProps = StackScreenProps<GroupsStackParamsList, 'JoinGroup'>;
export type GroupInformationScreenProps = StackScreenProps<GroupsStackParamsList, 'GroupInformation'>;


// Crear tipo de Chatbot
/// -----------------------------------------------------------------
export type ChatbotStackParamsList = {
    Chatbot: undefined;
};
// Crear type por cada screen de ChatbotStack
export type ChatbotScreenProps = StackScreenProps<ChatbotStackParamsList, 'Chatbot'>;
/// -----------------------------------------------------------------


/**
 * AppStack typos
 * Aquí definimos el resto de pantallas de uso general para la
 * aplicación que no están directamente relacionadas con las
 * pantallas que se integran en la barra de navegación inferior.
 */
export type AppStackParamList = {
    Welcome: undefined;
    CreateEvent: undefined;
    Load: undefined;
}

// Crear type por cada screen de AppStack
export type WelcomeScreenProps = StackScreenProps<AppStackParamList, 'Welcome'>;
export type CreateEventScreenProps = StackScreenProps<AppStackParamList, 'CreateEvent'>;
export type LoadingScreenProps = StackScreenProps<AppStackParamList, 'Load'>;