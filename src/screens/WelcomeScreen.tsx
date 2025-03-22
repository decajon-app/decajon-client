import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator'; 
import { getLaunchData, saveLaunchData } from '../storage/LaunchStorage';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'WelcomeScreen'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const Welcome: React.FC<LoginProps> = ({ navigation }) => {
  const [activeCard, setActiveCard] = useState<'create' | 'join' | 'skip' | null>(null);

  const handlePress = (card: 'create' | 'join' | 'skip'): void => {
    setActiveCard(card);

    if (card === 'skip') {
      navigation.navigate('HomeScreen');
    }
    else if (card === 'create') {
      console.log('Option Create');
      console.log('CreateGroup');
    } else if (card === 'join') {
      console.log('Option Join');
      console.log('JoinGroup');
    } else {
      console.log('Error...');
    }
  };

  const returnPage = (): void => {
    console.log('Return page button');
    console.log('CreateAccount');
  };

  useEffect(() => {
    const changeLaunchData = async () => {
      await saveLaunchData(false);
    };
    changeLaunchData();
    getLaunchData().then(value => {
      console.log("Se ha cambiado el valor!!!!: ", value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={returnPage}>
          <Icon name="navigate-before" color="white" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          ¿Cuál es la opción más adecuada para ti?
        </Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, activeCard === 'create' && styles.activeCard]}
          onPress={() => handlePress('create')}>
          <Icon
            style={[styles.icon, activeCard === 'create' && styles.activeIcon]}
            name="library-music"
            color="white"
            size={45}
          />
          <Text style={styles.txt}>Crear nuevo grupo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, activeCard === 'join' && styles.activeCard]}
          onPress={() => handlePress('join')}>
          <Icon
            style={[styles.icon, activeCard === 'join' && styles.activeIcon]}
            name="groups"
            color="white"
            size={45}
          />
          <Text style={styles.txt}>Unirme a un grupo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text onPress={() => handlePress('skip')}>Omitir</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EDE1',
  },
  header: {
    padding: 20,
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    textShadowColor: 'gray',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 30,
  },
  btnContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingRight: 1,
    marginTop: 50,
  },
  btn: {
    backgroundColor: '#200707',
    borderRadius: 50, 
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  card: {
    width: '40%',
    margin: 15,
    padding: 15,
    paddingVertical: 25,
    backgroundColor: '#200606',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 5,
  },
  activeCard: {
    backgroundColor: '#763F0E',
  },
  icon: {
    margin: 0,
    width: '45%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#763F0E',
  },
  activeIcon: {
    backgroundColor: '#200606',
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 40,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
  },
});

export default Welcome;
