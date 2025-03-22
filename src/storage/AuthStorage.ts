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

/**
 * Guarda el token en AsyncStorage, bajo la clave "userToken"
 */
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Error al guardar el token:", error);
  }
};


/**
 * Recupera el token usando la clave "usertoken"
 */
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("accessToken");
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
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};
