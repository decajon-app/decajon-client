import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupDto } from '../../models';
import { getUserData } from '../../storage/UserStorage';
import { createGroup } from '../../api/GroupsApi';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupsStackParamsList } from '../../types/navigation';

type CreateGroupScreenProps = StackScreenProps<GroupsStackParamsList, 'CreateGroup'>;

const CreateGroup: React.FC<CreateGroupScreenProps> = ({ navigation, route }) => {
  const [nameGroup, setNameGroup] = useState<string>('');
  const [creatorId, setCreatorId] = useState<number>(-1);

  const handleCreateGroup = async (): Promise<void> => {
    const newGroupRequest: GroupDto = {
      name: nameGroup,
      ownerId: creatorId
    };

    try {
      const newGroupData: GroupDto = await createGroup(newGroupRequest);
      console.log(newGroupData);
      navigation.navigate('GroupInformation', {...newGroupData});
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario.');
      return;
    }
  };

  const returnPage = (): void => {
    console.log('Return page button');
    // navigation.navigate('');
  };

  useEffect(() => {
    const fetchUserId = async () => {
      getUserData().then(userData => {
        setCreatorId(userData.id);
      });
    };
    fetchUserId();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={returnPage}>
          <Icon name="navigate-before" color="white" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Crear nuevo grupo</Text>
        <Text style={styles.subtitle}>¿Cuál es el nombre del grupo?</Text>
      </View>

      <View style={styles.nameGroupInput}>
        <Icon name="groups" color="#200606" size={30} />
        <TextInput
          style={styles.input}
          placeholder="Nombre del grupo"
          placeholderTextColor={'black'}
          onChangeText={setNameGroup}
          value={nameGroup}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
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
    paddingTop: 100,
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
  image: {
    width: 100,
    height: 40,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
  },
  nameGroupInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    marginVertical: 0,
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
    margin: 10,
    marginVertical: 0,
    fontSize: 22,
    width: '90%',
  },
  button: {
    backgroundColor: '#200606',
    padding: 15,
    margin: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 80,
    shadowColor: '#200606',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 16,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CreateGroup;
