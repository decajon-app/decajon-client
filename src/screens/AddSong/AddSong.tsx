import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import styles from "./styles";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Alert, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

type AddSongProps = StackScreenProps<GroupsStackParamsList, 'AddSong'>;

// Componente principal
const AddSong: React.FC<AddSongProps> = ({ navigation }) => {
    const [nombre, setNombre] = useState<string>('');
    const [artista, setArtista] = useState<string>('');

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
                        <Icon name="multitrack-audio" size={200} color="#FFF7EE" />
                    </View>
                    
                    <View style={styles.form}>
                        <View style={styles.inputLabel}>
                            <Icon name="music-note" color="#200606" size={35} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre(s)"
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
                        <TouchableOpacity style={styles.buttonAdd}>
                            <Text style={styles.buttonText}>Siguiente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

            </ScrollView>

            
        </View>
    );
};

export default AddSong;