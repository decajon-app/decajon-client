import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

type AddSongProps = StackScreenProps<GroupsStackParamsList, 'AddSong'>;

const AddSong: React.FC<AddSongProps> = ({ navigation }) => {
    const [nombre, setNombre] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [isAddedModalVisible, setIsAddedModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // Nuevo estado para el modal de error

    const handleAddSong = () => {
        if (nombre.trim() === '' || artista.trim() === '') {
            setIsErrorModalVisible(true); // Mostrar modal de error

            setTimeout(() => {
                setIsErrorModalVisible(false);
            }, 1500);

            return;
        }

        setIsAddedModalVisible(true); // Mostrar modal de éxito

        setTimeout(() => {
            setIsAddedModalVisible(false);
            navigation.goBack(); // Regresar a la pantalla anterior
        }, 1500);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.body}>
                <View style={styles.container}>
                    <View style={styles.headerLogo}>
                        <TouchableOpacity>
                            <Icon name="account-circle" size={50} color="#4A1900" />
                        </TouchableOpacity>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                        <TouchableOpacity>
                            <Icon name="calendar-month" size={50} color="#4A1900" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleTop}>
                        <Text style={styles.titleText}>Agregar canción</Text>
                    </View>

                    <View style={styles.songImageContainer}>
                        <Icon name="multitrack-audio" size={150} color="#FFF7EE" />
                    </View>
                    
                    <View style={styles.form}>
                        <View style={styles.inputLabel}>
                            <Icon name="music-note" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Canción"
                                placeholderTextColor="gray"
                                onChangeText={setNombre}
                                value={nombre}
                            />
                        </View>
                    
                        <View style={styles.inputLabel}>
                            <Icon name="person" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Artista/Compositor"
                                placeholderTextColor="gray"
                                onChangeText={setArtista}
                                value={artista}
                            />
                        </View>
                    </View>

                    <View style={styles.containerBottom}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddSong}>
                            <Text style={styles.buttonText}>Agregar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Modal de confirmación de canción agregada */}
            <Modal
                transparent={true}
                visible={isAddedModalVisible}
                animationType="fade"
                onRequestClose={() => setIsAddedModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>¡Canción agregada exitosamente!</Text>
                        <Icon name="check-circle" size={50} color="#4A1900" />
                    </View>
                </View>
            </Modal>

            {/* Modal de error por campos vacíos */}
            <Modal
                transparent={true}
                visible={isErrorModalVisible}
                animationType="fade"
                onRequestClose={() => setIsErrorModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Por favor, completa todos los campos.</Text>
                        <Icon name="error" size={50} color="#FF0000" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddSong;
