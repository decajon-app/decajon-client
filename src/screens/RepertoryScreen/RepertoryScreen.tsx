import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { RepertoireSongCardDto } from "../../models/RepertoireDto";
import { FlatList } from "react-native-gesture-handler";
import { getRepertoire } from "../../api/RepertoireApi";

type RepertoryScreenProps = StackScreenProps<GroupsStackParamsList, 'RepertoryScreen'>;

const RepertoryScreen: React.FC<RepertoryScreenProps> = ({ navigation, route }) => {
    const { groupId } = route.params;
    const [isEditMode, setIsEditMode] = useState(false); // Estado para alternar entre modo edición y normal
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de confirmación
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false); // Estado para mostrar el modal de eliminación exitosa
    const [songs, setSongs] = useState<RepertoireSongCardDto[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState<string>('Cargando repertorio...');

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode); // Alternar entre mostrar y ocultar los botones de editar/borrar
    };

    const handleDeleteSong = () => {
        setIsDeleteModalVisible(true); // Mostrar el modal de confirmación
    };

    const confirmDelete = () => {
        setIsDeleteModalVisible(false);
        setIsDeletedModalVisible(true); // Mostrar el modal de eliminación exitosa

        // Cerrar el modal automáticamente después de 3 segundos
        setTimeout(() => {
            setIsDeletedModalVisible(false);
        }, 3000);
    };

    const handleEditSong = () => {
        navigation.navigate('EditSong'); // Navegar a la pantalla de edición de canción
    };

    const handleViewSong = (songId: number) => {
        navigation.navigate('ViewSong', { songId: songId }); // Navegar a la pantalla de vista de canción
    }

    useEffect(() => {
        const fetchRepertoireByGroup = async () => {
            try {
                const fetchedSongs: RepertoireSongCardDto[] = await getRepertoire(groupId);
                if (fetchedSongs.length === 0) {
                    setLoadingMessage('Vaya, ¡no hay nada por aquí!');
                    return;
                }
                setSongs(fetchedSongs);
                setLoading(false);
            } catch (error) {
                Alert.alert("No se ha podido recuperar el repertorio del grupo.");
            }
        };
        fetchRepertoireByGroup();
    }, [songs]);

    return (
        <View style={{ flex: 1 }}>
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
                    <Text style={styles.titleText}>Repertorio</Text>
                    <TouchableOpacity onPress={handleEditToggle}>
                        <Icon name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                {loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{loadingMessage}</Text>
                    </View>
                :
                    <View style={styles.songList}>
                        <FlatList
                            data={songs}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.songItem} onPress={(event) => handleViewSong(item.id)}>
                                    <View style={styles.songImageContainer}>
                                        <Icon name="multitrack-audio" size={50} color="#FFF7EE" />
                                    </View>
                                    <View>
                                        <Text style={styles.songName}>{item.song}</Text>
                                        <Text style={styles.songDetails}>{item.artist}</Text>
                                    </View>
                                    {isEditMode && (
                                        <View style={styles.actionButtons}>
                                            <TouchableOpacity onPress={handleEditSong}>
                                                <Icon name="edit" size={35} color="#4A1900" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleDeleteSong}>
                                                <Icon name="delete" size={35} color="#4A1900" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            )}
                        >
                        </FlatList>

                    </View>
                }
            </View>

            {/* Botón flotante */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddSong', { groupId: groupId })}>
                <Icon name="add" size={30} color="#FFF" />
            </TouchableOpacity>
            
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

            {/* Modal de eliminación exitosa */}
            <Modal
                transparent={true}
                visible={isDeletedModalVisible}
                animationType="fade"
                onRequestClose={() => setIsDeletedModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            La canción se eliminó correctamente
                        </Text>
                        <Icon name="check-circle" size={50} color="#4A1900" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default RepertoryScreen;