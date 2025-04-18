import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput as TextInputType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../../../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginRequestDto, LoginResponseDto, UserDto } from '../../../models';
import { login } from '../../../api/AuthApi';
import { saveToken } from '../../../storage/AuthStorage';
import { saveUserData } from '../../../storage/UserStorage';

type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'> & {
  onLoginSuccess: () => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, onLoginSuccess, route }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const passwordRef = useRef<TextInputType | null>(null);
  
  const handleLogin = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }

    // Construir el UserRequestDto
    const loginRequest: LoginRequestDto = {
      email: email,
      password: password
    }

    try {
      const response: LoginResponseDto = await login(loginRequest);

      if(response.token) {
        const token: string = response.token;
        const user: UserDto = {
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName
        }

        await saveToken(token);
        await saveUserData(user);
      }

      onLoginSuccess();
      
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en login:", error.message);
        Alert.alert("Error", "Credenciales incorrectas o problema en el servidor.");
      } else {
        console.error("Error desconocido:", error);
        Alert.alert("Error", "Ocurrió un error inesperado.");
      }
    }

  }

  const resetPassword = () => {
    console.log('ForgotPassword');
    navigation.navigate('ForgotPassword');
  };

  const createAccount = () => {
    console.log('CreateAccount:');
    navigation.navigate('CreateAccount');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Image style={styles.image} source={require('../../../assets/logo.png')} />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <View style={styles.form}>
            {/* Campo de Correo */}
            <View style={styles.emailInput}>
              <Icon name="email" color="#200606" size={30} />
              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="black"
                onChangeText={setEmail}
                value={email}
                returnKeyType="next" // Cambia el botón a "Next"
                onSubmitEditing={() => passwordRef.current?.focus()} // Pasa al siguiente campo
              />
            </View>

            {/* Campo de Contraseña */}
            <View style={styles.passwordInput}>
              <Icon name="lock" color="#200606" size={30} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="black"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                ref={passwordRef} // Asigna la referencia
                returnKeyType="done" // Cambia el botón a "Done"
                onSubmitEditing={handleLogin} // Acción al pulsar "Done"
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={resetPassword}>
              <Text style={styles.txt}>Olvidé mi contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.txt}>¿Aún no tienes cuenta?</Text>
            <TouchableOpacity style={styles.createAccount} onPress={createAccount}>
              <Text style={styles.createAccountText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6EDE1',
    },
    header: {
      alignItems: 'center',
    },
    body: {
      paddingTop: 10,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#200606',
      marginLeft: 38,
      marginTop: 50,
    },
    image: {
      marginTop: '30%',
      width: '90%',
      height: 130,
    },
    form: {
      paddingTop: 20,
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      color: '#200606',
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
    forgotPassword: {
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: '#200606',
      padding: 15,
      marginBottom: -5,
      borderRadius: 50,
      alignItems: 'center',
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
      fontWeight: 'bold',
    },
    createAccount: {
      padding: 20,
      alignItems: 'center',
    },
    createAccountText: {
      fontSize: 22,
      color: '#200606',
      fontWeight: 'bold',
      marginTop: -15,
    },
    txt: {
      color: '#763F0F',
      fontSize: 20,
      paddingTop: 15,
    },
    emailInput: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordInput: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  
  export default LoginScreen;
  