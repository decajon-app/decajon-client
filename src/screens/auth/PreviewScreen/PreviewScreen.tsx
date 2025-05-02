import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageSourcePropType, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation';

type PreviewScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Preview'>;

const PreviewScreen: React.FC = () => {
  const navigation = useNavigation<PreviewScreenNavigationProp>();

  const images: ImageSourcePropType[] = [
    require('../../../assets/micro.png'),
    require('../../../assets/violin.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fadeAnim] = useState(new Animated.Value(1));

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

  useEffect(() => {
    const interval = setInterval(() => {
      animateImageChange();
    }, 2000); // 2 segundos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, [currentIndex]); // Dependencia al índice actual

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
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6EDE1',
  },
  container: {
    display: 'flex',
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
