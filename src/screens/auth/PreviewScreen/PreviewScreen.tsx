import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation';

type PreviewScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Preview'>;

const PreviewScreen: React.FC = () => {
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const translateX = useRef(new Animated.Value(-300)).current; // Inicia fuera de pantalla izquierda

  useEffect(() => {
    // Paso 1: entra al centro
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Paso 2: vibración en el centro
      Animated.sequence([
        Animated.timing(translateX, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 10, duration: 60, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]),
      // Paso 3: salida hacia la derecha
      Animated.timing(translateX, {
        toValue: 1000, // se va a la derecha
        duration: 1000,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Login');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/logo.png')} // Reemplaza con tu logo
        style={[
          styles.image,
          {
            transform: [{ translateX }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EDE1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
  },
});

export default PreviewScreen;
