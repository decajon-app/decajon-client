/**
 * Navigation.tsx
 */
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
    Login: { onLoginSuccess: () => void } | undefined;
    CreateAccount: undefined;
    ForgotPassword: undefined;
    ResetPassword: undefined;
    Preview: undefined;
};
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
    HomeTab: () => void | undefined;
    GroupsTab: undefined;
    ChatbotTab: undefined;
};


// Ahora creamos los tipos de las pantallas que van en cada Tab
// Crear tipo de Home
export type HomeStackParamList = {
    Home: { onLogoutSuccess?: () => void };
    Login: undefined;
    CreateEvent: undefined;
};


// Crear tipo de Grupos
export type GroupsStackParamsList = {
    Groups: { group: GroupDto };
    CreateGroup: undefined;
    CreateEvent: undefined;
    Members: { group: GroupDto };
    JoinGroup: undefined;
    GroupInformation: GroupDto;
    ViewGroup: { group: GroupDto};
    RepertoryScreen: { groupId: number };
    AddSong: { groupId: number };
    EditSong: undefined;
    ViewSong: undefined;
};


// Crear tipo de Chatbot
export type ChatbotStackParamsList = {
    Chatbot: undefined;
};
/// -----------------------------------------------------------------


/**
 * AppStack typos
 * Aquí definimos el resto de pantallas de uso general para la
 * aplicación que no están directamente relacionadas con las
 * pantallas que se integran en la barra de navegación inferior.
 */
export type AppStackParamList = {
    Welcome: { onLogoutSuccess: () => void } | undefined;
    Load: undefined;
}
