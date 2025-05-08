import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupsStackParamsList } from '../../types/navigation';
import { GroupDto, JoinGroupDto } from '../../models';
import { getUserData } from '../../storage/UserStorage';
import { joinGroup } from '../../api/GroupsApi';

type JoinGroupScreenProps = StackScreenProps<GroupsStackParamsList, 'JoinGroup'>;

const JoinGroupScreen: React.FC<JoinGroupScreenProps> = ({ navigation }) => {
  const [userId, setUserId] = useState<number>(-1);
  const [groupId, setGroupId] = useState<number>(-1);
  const [passwordGroup, setPasswordGroup] = useState<string>('');

  useEffect(() => {
    const getUserId = async () => {
      const userData = await getUserData();
      setUserId(userData.id);
    }
    getUserId();
  }, []);

  /* const handleBackPress = () => {
    navigation.navigate('Groups');
  }; */

  const handleGroupIdChange = (text: string) => {
    const numericGroupId = Number(text);
    setGroupId(numericGroupId);
  };

  const handleJoinGroup = async () => {
    const joinGroupData: JoinGroupDto = {
      userId: userId,
      groupId: groupId,
      password: passwordGroup
    }

    try {
      const newJoinGroupData: GroupDto = await joinGroup(joinGroupData);
      console.log(newJoinGroupData);
      // navigation.navigate('GroupInformation', {...newJoinGroupData});
      Alert.alert('Éxito!', 'Te has unido al grupo.');
      navigation.navigate('Groups', { group: newJoinGroupData });
    } catch (error) {
      Alert.alert('Error', 'No fue posible unirse al grupo.');
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}> 
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Unirme a un grupo</Text>
            <Text style={styles.subtitle}>Ingresa el ID del grupo</Text>
          </View>

          <View style={styles.nameGroupInput}>
            <Icon name="groups" color="#200606" size={30} />
            <TextInput
              style={styles.input}
              placeholder="ID del grupo"
              placeholderTextColor={'black'}
              onChangeText={handleGroupIdChange}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.header2}>
            <Text style={styles.subtitle2}>Contraseña del grupo</Text>
          </View>

          <View style={styles.nameGroupInput}>
            <Icon name="key" color="#200606" size={30} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={'black'}
              secureTextEntry
              onChangeText={(text) => setPasswordGroup(text)}
              value={passwordGroup}
            />
          </View>

          <Text style={styles.subtitle3}>Solicita el ID y contraseña al administrador del grupo</Text>

          <TouchableOpacity style={styles.button} onPress={handleJoinGroup}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf2e2',
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
    marginTop: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  header2: {
    padding: 20,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 50,
  },
  subtitle2: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 20,
  },
  subtitle3: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
    color: '#763F0E',
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
    marginVertical: 40,
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
});

export default JoinGroupScreen;