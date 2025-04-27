import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from "../../types/navigation";
import React, { useEffect, useState } from "react";
import styles from "./GroupsScreen.styles";
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupDto } from "../../models";
import GroupCard from "../../components/GroupCard/GroupCard";
import { ScrollView } from "react-native-gesture-handler";
import { getGroupsFromUser } from "../../api/GroupsApi";
import { getUserData } from "../../storage/UserStorage";

type GroupsScreenProps = StackScreenProps<GroupsStackParamsList, 'Groups'>;

const GroupsScreen: React.FC<GroupsScreenProps> = ({ navigation }) => {
    const [groups, setGroups] = useState<GroupDto[]>([]);
    const [userId, setUserId] = useState<number>(-1);

    useEffect(() => {
        const fetchGroups = async () => {
            const fetchedGroups = await getGroupsFromUser(userId);
            setGroups(fetchedGroups);
        };
        getUserData().then(userData => {
            setUserId(userData.id);
        });
        fetchGroups();        
    }, []);
    
    const handleCreateGroup = () => {
        navigation.navigate('CreateGroup');
    }

    const handleJoinGroup = () => {
        navigation.navigate('JoinGroup');
    }

    return (
        <ScrollView>
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
                data={groups}
                /* keyExtractor={(item) => item.id} */
                renderItem={({ item }) => <GroupCard item={item} navigation={navigation} />}
            />
        </View>
        </ScrollView>
    );
};

export default GroupsScreen;