import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../../types/navigation';

type ForgotPasswordScreenProps = StackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState<string>('');

  const resetPassword = (): void => {
    console.log('Email:', email);
    // navigation.navigate('ResetPassword');
  };

  const returnPage = (): void => {
    console.log('Return page button');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={returnPage}>
          <Icon name="navigate-before" color="white" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Olvidé mi contraseña</Text>
        <Text style={styles.subtitle}>
          Ingresa tu correo, si el correo está registrado, enviaremos un correo con un link para crear una nueva contraseña.
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon 
          name="send" 
          color="#200606" 
          size={150} 
          style={{ transform: [{ rotate: '-45deg' }] }} 
        />
      </View>

      <View style={styles.form}>
        <View style={styles.inputLabel}>
          <Icon name="email" color="#200606" size={30} />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor={'black'}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Recuperar</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    padding: 18,
    fontSize: 22,
    textAlign: 'center',
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
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;