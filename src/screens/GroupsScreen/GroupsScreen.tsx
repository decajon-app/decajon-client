import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from "../../types/navigation";
import React from "react";
import styles from "./GroupsScreen.styles";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { GroupDto } from "../../models";
import GroupCard from "../../components/GroupCard/GroupCard";

type GroupsScreenProps = StackScreenProps<GroupsStackParamsList, 'Groups'>;

const MOCK_GROUPS: GroupDto[] = [
    { id: 1, ownerId: 1, name: 'Mariachi Mexcalli', description: 'Ensayos sugeridos'},
    { id: 2, ownerId: 2, name: 'Coro Voces del Alma', description: 'Próximo evento: Domingo 20 de Abril'},
    { id: 3, ownerId: 3, name: 'Banda Sinfónica Juvenil', description: 'Repertorio para el concierto de mayo'},
    { id: 3, ownerId: 3, name: 'CUCEI', description: 'Repertorio para el concierto de mayo'},
];

const GroupsScreen: React.FC<GroupsScreenProps> = ({ navigation }) => {
    
    const handleCreateGroup = () => {
        navigation.navigate('CreateGroup');
    }

    const handleJoinGroup = () => {
        navigation.navigate('JoinGroup');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.newGroupButton} onPress={handleCreateGroup}>
                <Text style={styles.newGroupButtonText}>Crear</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.newGroupButton} onPress={handleJoinGroup}>
                <Text style={styles.newGroupButtonText}>Unirme</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>Mis grupos</Text>
            </View>

            <FlatList 
                data={MOCK_GROUPS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GroupCard item={item} navigation={navigation} />}
            />
        </View>
    );
};

export default GroupsScreen;