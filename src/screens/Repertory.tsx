import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const initialSongs = [
    { id: '1', title: 'El Rey', artist: 'Vicente Fernández' },
    { id: '2', title: 'Cielito Lindo', artist: 'Pedro Infante' },
    { id: '3', title: 'La Bikina', artist: 'Luis Miguel' },
    { id: '4', title: 'Volver Volver', artist: 'Vicente Fernández' },
    { id: '5', title: 'Guadalajara', artist: 'Mariachi Vargas' },
];

const Repertory = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newSong, setNewSong] = useState({ title: '', artist: '' });
    const [songList, setSongList] = useState(initialSongs);

    const renderItem = ({ item }: { item: { id: string; title: string; artist: string } }) => (
        <View style={styles.item}>
            <Icon name="music-note" size={24} color="white" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
            </View>
        </View>
    );

    const addSong = () => {
        setSongList([...songList, { id: (songList.length + 1).toString(), ...newSong }]);
        setNewSong({ title: '', artist: '' });
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.groupTitle}>Mariachi</Text>
            <FlatList
                data={songList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    Agregar canción
                </Text>
            </TouchableOpacity>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Nombre de la canción"
                            placeholderTextColor={'#4A1900'}
                            value={newSong.title}
                            onChangeText={text => setNewSong({ ...newSong, title: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Artista/Grupo"
                            placeholderTextColor={'#4A1900'}
                            value={newSong.artist}
                            onChangeText={text => setNewSong({ ...newSong, artist: text })}
                            style={styles.input}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#200606" />
                            <Button title="Aceptar" onPress={addSong} color="#200606" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F6EDE1',
    },
    groupTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 25,
        textAlign: 'center',
        color: '#4A1900',
    },
    listContainer: {
        paddingBottom: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#4A1900',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
    },
    icon: {
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#4A1900',
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#4A1900',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A1900',
    },
    artist: {
        fontSize: 14,
        color: '#4A1900',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#4A1900',
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 18,
        color: '#4A1900',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#200606',
        borderRadius: 50,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Repertory;
