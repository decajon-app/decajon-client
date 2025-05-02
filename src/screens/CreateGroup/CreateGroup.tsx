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

const CreateGroup: React.FC<CreateGroupScreenProps> = ({ navigation }) => {
  const [nameGroup, setNameGroup] = useState<string>('');
  const [creatorId, setCreatorId] = useState<number>(-1);

  const handleCreateGroup = async (): Promise<void> => {
    const newGroupRequest: GroupDto = {
      name: nameGroup,
      ownerId: creatorId
    };

    try {
      const newGroupData: GroupDto = await createGroup(newGroupRequest);
      navigation.navigate('GroupInformation', {...newGroupData});
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el grupo.');
      return;
    }
  };

  const returnPage = (): void => {
    navigation.navigate('Groups');
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

      <View style={styles.header1}>
        <TouchableOpacity>
          <Icon name="account-circle" size={50} color="#4A1900" />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <TouchableOpacity>
          <Icon name="calendar-month" size={50} color="#4A1900" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Nuevo grupo</Text>
        <Text style={styles.subtitle}>Nombre del grupo</Text>
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
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EDE1',
  },
  header1: {
    backgroundColor: '#FFF7EE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 10,
    paddingBottom: 5, 
  },
  logo: {
    width: 160,
    height: 60,
    borderRadius: 10,
  },
  header: {
    padding: 20,
    marginTop: 100,
    marginLeft: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
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
    color: '#200606',
    backgroundColor: '#FFF7EE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 5,
    marginVertical: 5,
    marginHorizontal: 10,
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