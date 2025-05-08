import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

type EditSongProps = StackScreenProps<GroupsStackParamsList, 'EditSong'>;

const groupName = 'Nombre del grupo';
const songName = 'Nombre de la canción';
const songDetails = 'Compositor/Cantante';
const genre = 'Género';
const duration = 'Duración';
const complexity = 'Complejidad';
const popularity = 'Popularidad';
const performance = 'Calidad';
const comment = 'Comentarios';


const EditSong: React.FC<EditSongProps> = ({ navigation }) => {
    const [nombre, setNombre] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [complexity, setComplexity] = useState<string>('');
    const [popularity, setPopularity] = useState<string>('');
    const [performance, setPerformance] = useState<string>('');
    const [comment, setComment] = useState<string>('');

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
                    <View style={styles.titleTop}>
                        <Text style={styles.titleText}>Editar canción</Text>
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

                        <View style={styles.inputLabel}>
                            <Icon name="library-music" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Género"
                                placeholderTextColor="gray"
                                onChangeText={setGenre}
                                value={genre}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="timer" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Duración"
                                placeholderTextColor="gray"
                                onChangeText={setDuration}
                                value={duration}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="insights" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Complejidad"
                                placeholderTextColor="gray"
                                onChangeText={setComplexity}
                                value={complexity}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="star-rate" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Popularidad"
                                placeholderTextColor="gray"
                                onChangeText={setPopularity}
                                value={popularity}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="fitness-center" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Calidad"
                                placeholderTextColor="gray"
                                onChangeText={setPerformance}
                                value={performance}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="comment" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Comentarios"
                                placeholderTextColor="gray"
                                onChangeText={setComment}
                                value={comment}
                            />
                        </View>
                    </View>

                    <View style={styles.containerBottom}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddSong}>
                            <Text style={styles.buttonText}>Editar</Text>
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
                        <Text style={styles.modalText}>¡Canción editada exitosamente!</Text>
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

export default EditSong;
