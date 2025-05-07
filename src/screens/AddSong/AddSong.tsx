import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { CreateSongDto } from "../../models/RepertoireDto";
import { createSong } from "../../api/RepertoireApi";

type AddSongProps = StackScreenProps<GroupsStackParamsList, 'AddSong'>;

const AddSong: React.FC<AddSongProps> = ({ navigation, route }) => {
    const { groupId } = route.params;

    const [nombre, setNombre] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [tono, setTono] = useState<string>('');
    const [duracion, setDuracion] = useState<string>('');
    const [rendimiento, setRendimiento] = useState<number>(0);
    // const [popularidad, setPopularidad] = useState<number>(0);
    const [complejidad, setComplejidad] = useState<number>(0);
    const [comentarios, setComentarios] = useState<string>('');

    const [isAddedModalVisible, setIsAddedModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    const handleAddSong = async (): Promise<void> => {
        if (nombre.trim() === '' || artista.trim() === '') {
            setIsErrorModalVisible(true); // Mostrar modal de error
            setTimeout(() => {
                setIsErrorModalVisible(false);
            }, 1500);
            return;
        }

        const newSong: CreateSongDto = {
            groupId: groupId,
            title: nombre,
            artist: artista,
            genre: genero ? genero : undefined,
            duration: duracion ? timeToSeconds(duracion) : undefined,
            performance: rendimiento ? rendimiento : undefined,
            complexity: complejidad ? complejidad : undefined,
            comments: comentarios ? comentarios : undefined,
            tone: tono ? tono : undefined
        };

        try {
            const response = await createSong(newSong);
            setIsAddedModalVisible(true); // Mostrar modal de éxito
            setTimeout(() => {
                setIsAddedModalVisible(false);
                navigation.goBack(); // Regresar a la pantalla anterior
            }, 1500);
        } catch (error) {
            Alert.alert('Error', 'No se pudo agregar la canción.');
        }
    };

    const handleInputChange = (text: string, setValue: (value: number | null) => void) => {
        const number = parseInt(text, 10);

        if(!isNaN(number)) {
            setValue(number);
        } else if (text === '') {
            setValue(null);
        } else {
            Alert.alert("Dato no valido, se esperan valores numericos para este campo.");
        }
    }

    const timeToSeconds = (timeString: string): number | null => {
        const parts = timeString.split(':');
        if (parts.length < 2 || parts.length > 3) return null;
        let totalSeconds = 0;
        let factor = 1;
        for (let i = parts.length - 1; i >= 0; i--) {
          const value = parseInt(parts[i], 10);
          if (isNaN(value)) return null;
          totalSeconds += value * factor;
          factor *= 60;
        }
        return totalSeconds;
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
                                placeholder="Nombre de la canción"
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
                                onChangeText={setGenero}
                                value={genero}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="library-music" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Tonalidad"
                                placeholderTextColor="gray"
                                onChangeText={setTono}
                                value={tono}
                            />
                        </View>
                        
                        <View style={styles.inputLabel}>
                            <Icon name="timer" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Duración"
                                placeholderTextColor="gray"
                                onChangeText={setDuracion}
                                value={duracion}
                            />
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="insights" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Rendimiento"
                                placeholderTextColor="gray"
                                onChangeText={
                                    (text) => handleInputChange(text, setRendimiento)
                                }
                                value={rendimiento !== null ? rendimiento.toString() : ''}
                                keyboardType="numeric"
                            />
                        </View>
                    
                        {/*<View style={styles.inputLabel}>
                            <Icon name="star-rate" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Popularidad"
                                placeholderTextColor="gray"
                                onChangeText={setPopularidad}
                                value={popularidad}
                                keyboardType="numeric"
                            />
                        </View>*/}
                    
                        <View style={styles.inputLabel}>
                            <Icon name="fitness-center" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Complejidad"
                                placeholderTextColor="gray"
                                onChangeText={
                                    (text) => handleInputChange(text, setComplejidad)
                                }
                                value={complejidad !== null ? complejidad.toString() : ''}
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.inputLabel}>
                            <Icon name="comment" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Comentarios..."
                                placeholderTextColor="gray"
                                onChangeText={setComentarios}
                                value={comentarios}
                                multiline={true}
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
                        <Icon name="check-circle" size={50} color="#4A1900" />
                        <Text style={styles.modalText}>¡Canción agregada exitosamente!</Text>
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
                        <Icon name="error" size={50} color="#FF0000" />
                        <Text style={styles.modalText}>Por favor, completa todos los campos.</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddSong;
