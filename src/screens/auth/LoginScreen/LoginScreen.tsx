import React, { useState, useRef} from 'react';
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
  ActivityIndicator,
  Modal,
  TextInput as TextInputType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../../../types/navigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginRequestDto, LoginResponseDto, UserDto } from '../../../models';
import { login } from '../../../api/AuthApi';
import { saveToken } from '../../../storage/AuthStorage';
import { saveUserData } from '../../../storage/UserStorage';
import * as Animatable from 'react-native-animatable';

interface LoginScreenProps extends StackScreenProps<AuthStackParamList, 'Login'> {
  // onLoginSuccess?: () => void; // Ya lo obtenemos de route.params
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const passwordRef = useRef<TextInputType | null>(null);

  const showErrorModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const showSuccessModal = (message: string) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
      route.params?.onLoginSuccess?.(); 
    }, 1500);
  };

  const handleLogin = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      showErrorModal("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setIsLoading(true);

    const loginRequest: LoginRequestDto = {
      email: email,
      password: password,
    };

    try {
      const response: LoginResponseDto = await login(loginRequest);

      if (response.token) {
        const token: string = response.token;
        const user: UserDto = {
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        };

        await saveToken(token);
        await saveUserData(user);
      }

      showSuccessModal("Inicio de sesión exitoso");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en login:", error.message);
        showErrorModal("Correo o contraseña invalidos.");
      } else {
        console.error("Error desconocido:", error);
        showErrorModal("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const createAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image style={styles.image} source={require('../../../assets/logo.png')} />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <View style={styles.form}>
            <View style={styles.emailInput}>
              <Icon name="email" color="#200606" size={35} />
              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="black"
                onChangeText={setEmail}
                value={email}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>

            <View style={styles.passwordInput}>
              <Icon name="lock" color="#200606" size={35} />
              <TextInput
                style={[styles.inputPassword]}
                placeholder="Contraseña"
                placeholderTextColor="black"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={!showPassword}
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
              <Animatable.View
                animation={isLoading ? 'pulse' : undefined}
                iterationCount={isLoading ? 1 : undefined}
                duration={2000}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                  )}
                </TouchableOpacity>
              </Animatable.View>

              <Text style={styles.txt}>¿Aún no tienes cuenta?</Text>
              <TouchableOpacity style={styles.createAccount} onPress={createAccount}>
                <Text style={styles.createAccountText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Error */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Icon name="error-outline" size={50} color="#e74c3c" />
            <Text style={modalStyles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>

      {/* Modal de Éxito */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Icon name="check-circle" size={50} color="#4A1900" />
            <Text style={modalStyles.modalText}>{successMessage}</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;
