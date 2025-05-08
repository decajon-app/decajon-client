import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useCallback, useEffect, useState } from "react";
import styles from "../ViewGroup/styles";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData } from "../../storage/UserStorage";
import { getRoleByUserIdAndGroupId } from "../../api/UsersGroupsApi";
import { getSuggestionsByGroupId } from "../../api/RepertoireApi";
import { SuggestionCardDto } from "../../models/RepertoireDto";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

type ViewGroupScreenProps = StackScreenProps<GroupsStackParamsList, 'ViewGroup'>;

// Componente principal
const ViewGroup: React.FC<ViewGroupScreenProps> = ({ navigation, route }) => {
  const { group } = route.params;
  const [role, setRole] = useState<string>('MEMBER');
  const [suggestedPractices, setSuggestedPractices] = useState<SuggestionCardDto[]>([]);

  const handleCreateEvent = () => { 
    navigation.navigate('CreateEvent');
  }

  const handleViewSong = (songId: number) => {
    navigation.navigate('ViewSong', { songId: songId });
  };

  const formatDate = (isoString: string): string => {
    const cleanDate = isoString.replace(/\[.*\]/, '');
    const date = new Date(cleanDate);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

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
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadPractices = async () => {
        if (group.id === null) return;
    
        try {
          const data = await getSuggestionsByGroupId(group.id!);
          setSuggestedPractices(data);
        } catch (error) {
          Alert.alert("Error", "No se pudieron cargar los ensayos sugeridos.");
        } 
      };
      loadPractices();
      return () => {
        loadPractices();
      }
    }, [])
  );

  /*useEffect(() => {
      const loadPractices = async () => {
        if (group.id === null) return;
    
        try {
          const data = await getSuggestionsByGroupId(group.id!);
          setSuggestedPractices(data);
        } catch (error) {
          Alert.alert("Error", "No se pudieron cargar los ensayos sugeridos.");
        } 
      };
      loadPractices();
    }, [group.id]);*/

  return (            
    <View style={{ flex: 1 }}> 
          <View style={styles.container}>
            <FlatList
              data={suggestedPractices}
              keyExtractor={(item) => item.repertoireId.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleViewSong(item.repertoireId)}>
                  <View style={styles.card}>
                    <View style={styles.cardIcon}>
                      <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                    </View>
                    <View style={styles.cardContainer}>
                      <Text style={styles.groupName}>{item.title}</Text>
                      <Text style={styles.songTitle}>{item.artist}</Text>
                      <Text style={styles.songDetails}>{item.group}</Text>
                      <Text style={styles.songDetails}>{formatDate(item.dueDate)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListHeaderComponent={
                <>
                  <View> 
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

                        <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
                </View>
                </>
              }
              ListFooterComponent={
                <>
                <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
                      <TouchableOpacity>
                          <View style={styles.cardEvent}>
                              <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
                              <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
                          </View>
                      </TouchableOpacity>
                </View>
                </>
              }
            />
            {/* Botón flotante */}
            <TouchableOpacity style={styles.floatingButton} onPress={handleGroupInformation}>
              <Icon name="share" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
  );
};

export default ViewGroup;