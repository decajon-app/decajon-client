import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Modal } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { getSongByRepertoireId } from "../../api/RepertoireApi";
import { RepertoireSongDto } from "../../models/RepertoireDto";
import { reviewSongCardById } from "../../api/RepertoireApi";
import { Rating } from 'react-native-ratings';



type ViewSongProps = StackScreenProps<GroupsStackParamsList, 'ViewSong'>;

const ViewSong: React.FC<ViewSongProps> = ({ navigation, route }) => {
    const [song, setSong] = useState<RepertoireSongDto>();
    const { songId } = route.params;

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de confirmación
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false); // Estado para mostrar el modal de eliminación exitosa
    const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
    const [rating, setRating] = useState(0);

    const closeRatingModal = () => setIsRatingModalVisible(false);

    const confirmRating = async () => {
        setIsRatingModalVisible(false);
        try{
            const reviewCard = {
                repertoireId: songId,
                rating: rating,
            };
            await reviewSongCardById(reviewCard);
            console.log("Calificación enviada:", reviewCard);
            Alert.alert("Éxito", "Calificación enviada correctamente");
        }catch (error: any) {
            Alert.alert("Error", "Error al calificar la canción");
        }
    };
    const handleRatingPractice = () => {
        setIsRatingModalVisible(true);
    };

    const handleViewPartitura = () => {
        Alert.alert('Partitura','Funcionalidad disponible en la siguiente versión');
    };

    const handleEditSong = () => {
        navigation.navigate('EditSong'); // Navegar a la pantalla de edición de canción
    };

    const handleDeleteSong = () => {
        setIsDeleteModalVisible(true); // Mostrar el modal de confirmación
    };

    const confirmDelete = () => {
        setIsDeleteModalVisible(false);
        setIsDeletedModalVisible(true); // Mostrar el modal de eliminación exitosa

        
        // Lógica para eliminar la canción


        // Cerrar el modal automáticamente después de 3 segundos
        setTimeout(() => {
            setIsDeletedModalVisible(false);
        }, 3000);
    };

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const songDetails = await getSongByRepertoireId(songId);
                if(songDetails !== null) {
                    setSong(songDetails);
                }
            } catch (error: any) {
                Alert.alert("Error", "Error al recuperar la informacion de la cancion");
            }
        };
        fetchSongDetails();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.body}>
                <View style={styles.container}> 
                    <View style={styles.actionButtons}>
                        <TouchableOpacity  onPress={handleEditSong}>
                            <Icon name="edit" size={35} color="#4A1900" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteSong}>
                            <Icon name="delete" size={35} color="#4A1900" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.songImageContainer}>
                        <Icon name="multitrack-audio" size={150} color="#FFF7EE" />
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputLabel}>
                            <Icon name="music-note" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.title ? song.title : 'Canción'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="person" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.artist ? song.artist : 'Artista'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="library-music" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.genre ? song.genre : 'Género'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="timer" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.duration ? song.duration : 'Duración'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="insights" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.complexity ? song.complexity : 'Complejidad'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="star-rate" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.popularity ? song.popularity : 'Popularidad'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="fitness-center" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.performance ? song.performance : 'Calidad'}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="comment" color="#200606" size={35} />
                            <Text style={styles.input}>{song?.comment ? song.comment : 'Comentarios'}</Text>
                        </View>
                    </View>

                    <View style={styles.containerBottom}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={handleRatingPractice}>
                            <Text style={styles.buttonText}>Calificar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAdd} onPress={handleViewPartitura}>
                            <Text style={styles.buttonText}>Partitura</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Modal de confirmación para eliminar */}
            <Modal
                transparent={true}
                visible={isDeleteModalVisible}
                animationType="slide"
                onRequestClose={() => setIsDeleteModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            ¿Estás seguro de que deseas eliminar esta canción?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={styles.modalButtonCancel}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmDelete} style={styles.modalButtonConfirm}>
                                <Text style={styles.modalButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de rating */}
            <Modal
                transparent={true}
                visible={isRatingModalVisible}
                animationType="slide"
                onRequestClose={() => setIsRatingModalVisible(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Califica tu ensayo:</Text>
                    
                        <Rating
                            type="star"
                            ratingCount={4}
                            imageSize={40}
                            startingValue={rating}
                            onFinishRating={(value: number) => {
                                setRating(value);
                                console.log("Califica tu ensayo:", value);
                            }}
                            
                            showRating
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={confirmRating} style={styles.modalButtonConfirm}>
                                <Text style={styles.modalButtonText}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeRatingModal} style={styles.modalButtonConfirm}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default ViewSong;
