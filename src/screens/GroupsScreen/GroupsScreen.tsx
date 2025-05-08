import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from "../../types/navigation";
import React, { useCallback, useState } from "react";
import styles from "./GroupsScreen.styles";
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupDto } from "../../models";
import GroupCard from "../../components/GroupCard/GroupCard";
import { getGroupsFromUser } from "../../api/GroupsApi";
import { getUserData } from "../../storage/UserStorage";
import { useFocusEffect } from "@react-navigation/native";

type GroupsScreenProps = StackScreenProps<GroupsStackParamsList, 'Groups'>;

const GroupsScreen: React.FC<GroupsScreenProps> = ({ navigation }) => {
    const [groups, setGroups] = useState<GroupDto[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchGroups = async () => {
                try {
                    const userData = await getUserData();
                    if (userData && userData.id !== undefined && userData.id !== null) {
                        const fetchedGroups = await getGroupsFromUser(userData.id);
                        setGroups(fetchedGroups);                    
                    } else {
                        Alert.alert("Error", "No se pudo obtener la información del usuario.");
                    }
                } catch (error: any) {
                    Alert.alert("Error", "Error al recuperar los grupos.");
                }
            };

            fetchGroups();
        }, [])
    );

    const handleCreateGroup = () => {
        navigation.navigate('CreateGroup');
    }

    const handleJoinGroup = () => {
        navigation.navigate('JoinGroup');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleTop}>Mis grupos</Text>
            <View style={styles.buttonsTop}>
                <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={handleJoinGroup}>
                    <Text style={styles.buttonText}>Unirme</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={groups}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <GroupCard item={item} navigation={navigation} />}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#763F0E' }}>
                            Vaya, no te has unido a un grupo todavía
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

export default GroupsScreen;
