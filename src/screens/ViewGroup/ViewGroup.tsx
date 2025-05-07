import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useEffect, useState } from "react";
import styles from "../ViewGroup/styles";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from "../../storage/UserStorage";
import { getRoleByUserIdAndGroupId } from "../../api/UsersGroupsApi";

type ViewGroupScreenProps = StackScreenProps<GroupsStackParamsList, 'ViewGroup'>;

const groupName = 'Nombre del grupo';
const songName = 'Nombre de la canción';
const songDetails = 'Compositor/Cantante';

// Componente principal
const ViewGroup: React.FC<ViewGroupScreenProps> = ({ navigation, route }) => {
  const { group } = route.params;
  const [role, setRole] = useState<string>('MEMBER');

  const handleCreateEvent = () => { 
    navigation.navigate('CreateEvent');
  }

  const handleMembers = () => {
      navigation.navigate({ name: 'Members', params: { group, role } });
  }

  const handleRepertory = () => {
      if (group.id !== undefined) {
          navigation.navigate({ name: 'RepertoryScreen', params: { groupId: group.id } });
      } else {
          console.error("Group ID is undefined");
      }
  }

  const handleGroupInformation = () => {
    navigation.navigate('GroupInformation', { group, mode: 'view', role: role as 'MEMBER' | 'ADMIN' | 'OWNER' });
  }

  useEffect(() => {
    const fetchUserPermissions = async () => {
      const user = await getUserData();
      const userId = user.id;
      const groupId = group.id!;

      try {
        const response: { role: string } = await getRoleByUserIdAndGroupId(userId, groupId);
        setRole(response.role);
      } catch (error: any) {
        Alert.alert("Error", "Hubo un error determinando los permisos del usuario.");
      }
    };
    fetchUserPermissions();

    console.log(role);
  }, []);

  return (            
  <View style={{ flex: 1 }}> 
  <ScrollView> 
      <View style={styles.container}> 
          <Text style={styles.titleTop}>{group.name}</Text>
          <View style={styles.buttonsTop}>
              <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                  <Text style={styles.buttonText}>Nuevo evento</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button} onPress={handleMembers}>
                  <Text style={styles.buttonText}>Miembros</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.buttonExtra}>
              <TouchableOpacity style={styles.button} onPress={handleRepertory}>
                  <Text style={styles.buttonText}>Repertorio</Text>
              </TouchableOpacity>
          </View>


              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
                  <TouchableOpacity>
                      <View style={styles.cardEvent}>
                          <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
                          <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
                      </View>
                  </TouchableOpacity>
              </View>

              <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
                        <TouchableOpacity>
                          <View style={styles.card}>
                            <View style={styles.cardIcon}>
                              <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                            </View>
                            <View style={styles.cardContainer}>
                              <Text style={styles.groupName}>{groupName}</Text>
                              <Text style={styles.songTitle}>{songName}</Text>
                              <Text style={styles.songDetails}>{songDetails}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View style={styles.card}>
                            <View style={styles.cardIcon}>
                              <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                            </View>
                            <View style={styles.cardContainer}>
                              <Text style={styles.groupName}>{groupName}</Text>
                              <Text style={styles.songTitle}>{songName}</Text>
                              <Text style={styles.songDetails}>{songDetails}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View style={styles.card}>
                            <View style={styles.cardIcon}>
                              <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                            </View>
                            <View style={styles.cardContainer}>
                              <Text style={styles.groupName}>{groupName}</Text>
                              <Text style={styles.songTitle}>{songName}</Text>
                              <Text style={styles.songDetails}>{songDetails}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
      </View>

      </ScrollView>

        {/* Botón flotante */}
        <TouchableOpacity style={styles.floatingButton} onPress={handleGroupInformation}>
          <Icon name="share" size={30} color="#FFF" />
        </TouchableOpacity>
    </View>

  );
};

export default ViewGroup;