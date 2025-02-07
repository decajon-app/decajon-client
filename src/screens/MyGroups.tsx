import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const groups = [
    { id: '1', name: 'Mariachi', members: ['Juan Fresco', 'Francisco López', 'José Hernández'] },
    { id: '2', name: 'Jazz', members: ['Jesús Patiño', 'Mario Velázquez', 'Alberto Román'] },
    { id: '3', name: 'Acustico', members: ['Alejandro Núñez', 'Mario López', 'Andrés Hernández'] },
];

const MyGroups: React.FC<Props> = ({ navigation }) => {

    const openRepertory = () => {
        navigation.navigate('Repertory');
    }

    const openGroupInformation = () => {
        navigation.navigate('GroupInformation');
    }

    const [selectedGroup, setSelectedGroup] = useState<{ id: string; name: string; members: string[] } | null>(null);

    const renderGroup = ({ item }: { item: { id: string; name: string; members: string[] } }) => (
        <TouchableOpacity style={styles.item} onPress={() => setSelectedGroup(item)}>
            <Icon name="group" size={24} color="white" style={styles.icon} />
            <Text style={styles.title}>{item.name}</Text> 
        </TouchableOpacity>        
    );

    const renderMember = ({ item }: { item: string }) => (
        <View style={styles.item}>
            <Icon name="person" size={24} color="white" style={styles.icon} />
            <Text style={styles.title}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                {selectedGroup ? selectedGroup.name : 'Mis Grupos'}
            </Text>
            {selectedGroup ? (
                <View style={styles.groupContainer}>
                    <FlatList
                        data={selectedGroup.members}
                        renderItem={renderMember}
                        keyExtractor={(item) => item}
                    />
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.shareButton} onPress={openGroupInformation}>
                            <Icon name="share" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viewButton} onPress={openRepertory}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                                Ver Repertorio
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F6EDE1',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 25,
        textAlign: 'center',
        color: '#4A1900',
    },
    groupContainer: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#4A1900',
        borderRadius: 10,
        marginBottom: 10,
        color: '#4A1900',
    },
    icon: {
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#4A1900',
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#4A1900',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A1900',
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    shareButton: {
        backgroundColor: '#200606',
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    viewButton: {
        flex: 1,
        backgroundColor: '#200606',
        borderRadius: 50,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyGroups;
