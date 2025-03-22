import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getLaunchData, saveLaunchData } from '../storage/LaunchStorage';

type RootStackParamList = {
  LoadScreen: undefined;
  PreviewScreen: undefined;
  LoginScreen: undefined;
};

type LoadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoadScreen'>;

interface LoadProps {
  navigation: LoadScreenNavigationProp;
}

const Load: React.FC<LoadProps> = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLaunchData = async () => {
      const launchData = await getLaunchData();
      setIsFirstLaunch(launchData);
      if(isFirstLaunch === null) {
        saveLaunchData(true);
      };
    }
    fetchLaunchData();
  }, []); // Solo ejecutar una vez para obtener el firstLaunch

  useEffect(() => {
    // No hacer nada hasta que isFirstLaunch tenga un valor
    if(isFirstLaunch === null) return;

    if(isFirstLaunch) {
      navigation.navigate('PreviewScreen');
    }
    else {
      navigation.navigate('LoginScreen');
    }
  }, [navigation, isFirstLaunch]);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.txt}>Cargando...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7EDE1',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    resizeMode: 'contain',
  },
  txt: {
    fontSize: 20,
  },
});

export default Load;
