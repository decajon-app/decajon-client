import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { styles } from './styles';
import {
  StyleSheet,
  Text,
  Image,
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
    // navigation.navigate('ResetPassword');
  };

  const returnPage = (): void => {
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerImg}>
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Olvidé mi contraseña</Text>
        <Text style={styles.subtitle}>
          Ingresa tu correo, si el correo está registrado, enviaremos un correo con un link para crear una nueva contraseña.
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon 
          name="lock-open" 
          color="#200606" 
          size={150} 
        />
      </View>

      <View style={styles.form}>
        <View style={styles.inputLabel}>
          <Icon name="email" color="#200606" size={35} />
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


export default ForgotPasswordScreen;