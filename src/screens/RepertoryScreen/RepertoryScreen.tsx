import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Alert, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { RepertoireSongCardDto } from "../../models/RepertoireDto";
import { FlatList } from "react-native-gesture-handler";
import { getRepertoire } from "../../api/RepertoireApi";
import { useFocusEffect } from "@react-navigation/native";

type RepertoryScreenProps = StackScreenProps<GroupsStackParamsList, 'RepertoryScreen'>;

const RepertoryScreen: React.FC<RepertoryScreenProps> = ({ navigation, route }) => {
    const { groupId } = route.params;
    const [isEditMode, setIsEditMode] = useState(false); // Estado para alternar entre modo edición y normal
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de confirmación
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false); // Estado para mostrar el modal de eliminación exitosa
    const [songs, setSongs] = useState<RepertoireSongCardDto[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState<string>('Cargando repertorio...');

    const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para la búsqueda de canciones
    
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


    useFocusEffect(
        useCallback(() => {
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
                    Alert.alert("Error","No se ha podido recuperar el repertorio del grupo.");
                }
            };
            fetchRepertoireByGroup();
        }, [])
    );

    const normalize = (text: string) =>
        text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    
    const filteredSongs = songs.filter(song =>
        normalize(song.song || '').includes(normalize(searchQuery)) ||
        normalize(song.artist || '').includes(normalize(searchQuery))
    );
    
    

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.titleTop}>
                    <Text style={styles.titleText}>Repertorio</Text>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar canción..."
                            placeholderTextColor="gray"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        ></TextInput>
                        <TouchableOpacity style={styles.search} onPress={handleEditToggle}>
                            <Icon name="search" size={30} color="gray" />
                        </TouchableOpacity>

                    </View>
                    
                </View>
                
                {loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{loadingMessage}</Text>
                    </View>
                :
                    <View style={styles.songList}>
                        <FlatList
                            data={filteredSongs}
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
        </View>
    );
};

export default RepertoryScreen;