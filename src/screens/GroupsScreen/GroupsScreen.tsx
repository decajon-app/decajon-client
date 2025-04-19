import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from "../../types/navigation";
import React from "react";
import styles from "./GroupsScreen.styles";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupDto } from "../../models";
import GroupCard from "../../components/GroupCard/GroupCard";

type GroupsScreenProps = StackScreenProps<GroupsStackParamsList, 'Groups'>;

const MOCK_GROUPS: GroupDto[] = [
    { id: 1, ownerId: 1, name: 'Mariachi Mexcalli', description: 'Ensayos sugeridos'},
    { id: 2, ownerId: 2, name: 'Coro Voces del Alma', description: 'Próximo evento: Domingo 20 de Abril'},
    { id: 3, ownerId: 3, name: 'Banda Sinfónica Juvenil', description: 'Repertorio para el concierto de mayo'},
    { id: 4, ownerId: 4, name: 'CUCEI', description: 'Repertorio para el concierto de mayo'},
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
            <View style={styles.headerLogo}>
                <TouchableOpacity /* onPress={toggleMenu} */>
                    <Icon name="account-circle" size={50} color="#4A1900" />
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                <TouchableOpacity /* onPress={toggleCalendar} */>
                  <Icon name="calendar-month" size={50} color="#4A1900" />
                </TouchableOpacity>
            </View>

            <Text style={styles.titleTop}>Grupos</Text>
            <View style={styles.buttonsTop}>
                <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={handleJoinGroup}>
                    <Text style={styles.buttonText}>Unirme</Text>
                </TouchableOpacity>
            </View>




            <View style={styles.header}>
                <Text style={styles.title}>Mis grupos</Text>
            </View>

            <FlatList 
                data={MOCK_GROUPS}
                /* keyExtractor={(item) => item.id} */
                renderItem={({ item }) => <GroupCard item={item} navigation={navigation} />}
            />
        </View>
    );
};

export default GroupsScreen;