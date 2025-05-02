import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

type ViewSongProps = StackScreenProps<GroupsStackParamsList, 'ViewSong'>;

const ViewSong: React.FC<ViewSongProps> = ({ navigation }) => {
    // Datos simulados de la canción
    const nombre = "Nombre de la canción";
    const artista = "Artista/Compositor";
    const genero = "Género";
    const duracion = "Duración";
    const rendimiento = "Rendimiento";
    const popularidad = "Popularidad";
    const complejidad = "Complejidad";
    const comentarios = "Comentarios";

    const handleViewPartitura = () => {
        Alert.alert('Partitura','Funcionalidad disponible en la siguiente versión');
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
                        <Text style={styles.titleText}></Text>
                    </View>

                    <View style={styles.songImageContainer}>
                        <Icon name="multitrack-audio" size={150} color="#FFF7EE" />
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputLabel}>
                            <Icon name="music-note" color="#200606" size={35} />
                            <Text style={styles.input}>{nombre}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="person" color="#200606" size={35} />
                            <Text style={styles.input}>{artista}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="library-music" color="#200606" size={35} />
                            <Text style={styles.input}>{genero}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="timer" color="#200606" size={35} />
                            <Text style={styles.input}>{duracion}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="insights" color="#200606" size={35} />
                            <Text style={styles.input}>{complejidad}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="star-rate" color="#200606" size={35} />
                            <Text style={styles.input}>{popularidad}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="fitness-center" color="#200606" size={35} />
                            <Text style={styles.input}>{rendimiento}</Text>
                        </View>

                        <View style={styles.inputLabel}>
                            <Icon name="comment" color="#200606" size={35} />
                            <Text style={styles.input}>{comentarios}</Text>
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
