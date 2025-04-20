import React, { useState, useRef } from 'react';
import { styles } from './styles';
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

  const [showPassword, setShowPassword] = useState(false);

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
              <Icon name="email" color="#200606" size={35} />
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
              <Icon name="lock" color="#200606" size={35} />
              <TextInput
                style={[styles.inputPassword]}
                placeholder="Contraseña"
                placeholderTextColor="black"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={!showPassword} // <- Aquí se cambia
                ref={passwordRef}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={30}
                  color="#200606"
                  style={[styles.showPassword]}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={resetPassword}>
              <Text style={styles.txt}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
            
            <View style={styles.logContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <Text style={styles.txt}>¿Aún no tienes cuenta?</Text>
              <TouchableOpacity style={styles.createAccount} onPress={createAccount}>
                <Text style={styles.createAccountText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

  
export default LoginScreen;
  