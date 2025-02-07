// CORREGIR --------------------------------------------------------------


import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import ForgotPassword from './ForgotPassword';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator'; // Ajusta la ruta según tu proyecto

// Definimos los tipos de navegación y rutas
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const ResetPassword: React.FC<LoginProps> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const resetPassword = (): void => {
    console.log('newPassword:', newPassword);
    console.log('confirmPassword:', confirmPassword);
    navigation.navigate('LoginScreen');
  };
  
  const returnPage = (): void => {
    console.log('Return page button');
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={returnPage}>
          <Icon name="navigate-before" color="white" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Reestablecer contraseña</Text>
        <Text style={styles.subtitle}>
          La nueva contraseña debe tener:
          {'\n\t\t'}ꞏ Entre 8-24 caracteres
          {'\n\t\t'}ꞏ Mayúsculas y minúsculas
          {'\n\t\t'}ꞏ Al menos un caracter especial
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputLabel}>
          <Icon name="looks-one" color="#200606" size={30} />
          <Icon name="lock" color="#200606" size={30} />

          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="looks-two" color="#200606" size={30} />
          <Icon name="lock" color="#200606" size={30} />

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Reestablecer</Text>
        </TouchableOpacity>
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
    marginLeft: 30,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    padding: 18,
    paddingLeft: 0,
    fontSize: 22,
    textAlign: 'left',
  },
  form: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'transparent',
    borderBottomColor: 'black',

    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,

    borderBottomWidth: 2,

    padding: 5,
    margin: 10,
    marginVertical: 10,
    fontSize: 22,
    width: '70%',
  },
  button: {
    backgroundColor: '#200707',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    width: '80%',

    shadowColor: '#200606',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 16,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingRight: 1,
    marginTop: 50,
  },
  btn: {
    backgroundColor: '#200707',
    borderRadius: 50, // Se cambió de '50%' a un valor numérico
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
});

export default ResetPassword;
