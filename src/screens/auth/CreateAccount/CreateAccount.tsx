import React, { useState } from 'react';
import { styles } from './styles';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { registerUser } from '../../../api/AuthApi.ts';
import { UserRequestDto, UserDto } from '../../../models/index.ts';
import { AuthStackParamList } from '../../../types/navigation.ts';
import { StackScreenProps } from '@react-navigation/stack';

type CreateAccountScreenProps = StackScreenProps<AuthStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ navigation, route }) => {
  const [nombre, setNombre] = useState<string>('');
  const [apellido1, setApellido1] = useState<string>('');
  const [apellido2, setApellido2] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const createAccount = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Los campos no pueden estar vacíos.");
      return;
    }
    const userRequestData: UserRequestDto = {
      firstName: nombre,
      lastName: `${apellido1} ${apellido2}`,
      email: email,
      password: password
    }

    try {
      const newUserData: UserDto = await registerUser(userRequestData);
      console.log(newUserData);
      Alert.alert("", "Tu cuenta ha sido creada, por favor, inicia sesión para continuar");
      returnPage();

    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario.');
    }
  };

  const returnPage = (): void => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerImg}>
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Registro</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputLabel}>
          <Icon name="person" color="#200606" size={35} />
          <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            placeholderTextColor="black"
            onChangeText={setNombre}
            value={nombre}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="looks-one" color="#200606" size={35} />
          <TextInput
            style={styles.input}
            placeholder="Primer apellido"
            placeholderTextColor="black"
            onChangeText={setApellido1}
            value={apellido1}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="looks-two" color="#200606" size={35} />
          <TextInput
            style={styles.input}
            placeholder="Segundo apellido"
            placeholderTextColor="black"
            onChangeText={setApellido2}
            value={apellido2}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="email" color="#200606" size={35} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="lock" color="#200606" size={35} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="black"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <View style={styles.containerBottom}>
          <TouchableOpacity style={styles.button} onPress={createAccount}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
          <Text style={styles.txt}>¡Ya tengo cuenta!</Text>
          <TouchableOpacity
            style={styles.createAccount}
            onPress={() => returnPage()}
          >
            <Text style={styles.loginText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateAccountScreen;