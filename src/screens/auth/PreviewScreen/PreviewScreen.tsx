import React, { useState, useRef } from 'react';
import { StyleSheet, View, ImageSourcePropType, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation';

type PreviewScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Preview'>;

const PreviewScreen: React.FC = () => {
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const images: ImageSourcePropType[] = [
    require('../../../assets/micro.png'),
    require('../../../assets/violin.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animateImageChange = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) {
        navigation.navigate('Login');
      } else {
        setCurrentIndex(nextIndex);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Iniciar animación automática al entrar
      intervalRef.current = setInterval(() => {
        animateImageChange();
      }, 2000);

      return () => {
        // Limpiar animación al salir de la pantalla
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [currentIndex])
  );

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, { opacity: fadeAnim }]}
          resizeMode="contain"
          source={images[currentIndex]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6EDE1',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: '95%',
    width: 350,
    borderRadius: 20,
    backgroundColor: 'black',
  },
});

export default PreviewScreen;
