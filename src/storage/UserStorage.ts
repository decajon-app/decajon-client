import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "../models";


// Clave para guardar la informacion del usuario en el AsyncStorage
const USER_DATA = "userData";


/**
 * Guarda la informacion del usuario bajo la clave "userData"
 */
export const saveUserData = async (user: UserDto) => {
  try {
    await AsyncStorage.setItem(USER_DATA, JSON.stringify(user));
  } catch (error) {
    console.error("Error al guardar los datos del usuario:", error);
  }
};


/**
 * Recupera la informacion del usuario bajo la clave "userData"
 */
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

/**
 * Borra la informacion del usuario bajo la clave "userData"
 */
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA);
  } catch (error) {
    console.error("Error al eliminar los datos del usuario:", error);
  }
};
