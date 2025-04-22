/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

// Clave para guardar el token en el AsyncStorage
const ACCESS_TOKEN = "accessToken";

/**
 * Guarda el token en AsyncStorage, bajo la clave "userToken"
 */
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
  } catch (error) {
    console.error("Error al guardar el token:", error);
  }
};


/**
 * Recupera el token usando la clave "usertoken"
 */
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return null;
  }
};


/**
 * Borra el token eliminando la clave "userToken" del AsyncStorage
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};
