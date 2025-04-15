import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
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
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={returnPage}>
          <Icon name="navigate-before" color="white" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Registro</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputLabel}>
          <Icon name="person" color="#200606" size={30} />
          <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            placeholderTextColor="black"
            onChangeText={setNombre}
            value={nombre}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="looks-one" color="#200606" size={30} />
          <TextInput
            style={styles.input}
            placeholder="Primer apellido"
            placeholderTextColor="black"
            onChangeText={setApellido1}
            value={apellido1}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="looks-two" color="#200606" size={30} />
          <TextInput
            style={styles.input}
            placeholder="Segundo apellido"
            placeholderTextColor="black"
            onChangeText={setApellido2}
            value={apellido2}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="email" color="#200606" size={30} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputLabel}>
          <Icon name="lock" color="#200606" size={30} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="black"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.txt}>Ya tengo cuenta</Text>
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => returnPage()}
        >
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fbf2e2',
    padding:20,
  },
  header: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
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
    padding: 5,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAccount: {
    padding: 20,
    alignItems: 'center',
  },
  loginText: {
    backgroundColor:'#ffffff',
    fontSize: 22,
    color: '#763F0F',
    fontWeight: 'bold',
    marginTop: -15,
  },
  txt: {
    color: '#200606',
    fontSize: 20,
    paddingTop: 15,
    textAlign: 'center',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingRight: 1,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#200707',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
});

export default CreateAccountScreen;