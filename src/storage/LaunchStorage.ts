/**
 * 
 * 
 * 
 * 
 * 
 */
import AsyncStorage from "@react-native-async-storage/async-storage";


// Clave para guardar la informacion del usuario en el AsyncStorage
const FIRST_LAUNCH = "firstLaunch";


/**
 * Guarda la informacion de la primera ejecucion bajo la clave "firstLauch"
 */
export const saveLaunchData = async (firstLaunch: boolean) => {
  try {
    await AsyncStorage.setItem(FIRST_LAUNCH, JSON.stringify(firstLaunch));
  } catch (error) {
    console.error("Error al guardar datos de la primera ejecucion:", error);
  }
};


/**
 * Recupera la informacion del usuario bajo la clave "userData"
 */
export const getLaunchData = async () => {
  try {
    const firstLauch = await AsyncStorage.getItem(FIRST_LAUNCH);
    return firstLauch ? JSON.parse(firstLauch) : null;
  } catch (error) {
    console.error("Error al obtener los datos de la primera ejecucion:", error);
    return null;
  }
};

/**
 * Borra la informacion del usuario bajo la clave "userData"
 */
export const removeLaunchData = async () => {
  try {
    await AsyncStorage.removeItem(FIRST_LAUNCH);
  } catch (error) {
    console.error("Error al eliminar los datos de la primera ejecucion:", error);
  }
};