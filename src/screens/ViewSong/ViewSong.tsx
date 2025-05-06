import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { getSongByRepertoireId } from "../../api/RepertoireApi";
import { RepertoireSongDto } from "../../models/RepertoireDto";

type ViewSongProps = StackScreenProps<GroupsStackParamsList, 'ViewSong'>;

const ViewSong: React.FC<ViewSongProps> = ({ navigation, route }) => {
    const [song, setSong] = useState<RepertoireSongDto>();
    const { songId } = route.params;

    const handleViewPartitura = () => {
        Alert.alert('Partitura','Funcionalidad disponible en la siguiente versión');
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
                        <Text style={styles.titleText}></Text>
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
                        <TouchableOpacity style={styles.buttonAdd} onPress={handleViewPartitura}>
                            <Text style={styles.buttonText}>Partitura</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ViewSong;
