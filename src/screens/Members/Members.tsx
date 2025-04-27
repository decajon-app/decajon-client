import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

type MembersProps = StackScreenProps<GroupsStackParamsList, 'Members'>;

const Members: React.FC<MembersProps> = ({ navigation, route }) => {
    const [isEditMode, setIsEditMode] = useState(false); // Estado para alternar entre modo edición y normal
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de confirmación
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false); // Estado para mostrar el modal de eliminación exitosa

    const memberName = 'Nombre del miembro';
    const instrument = 'Instrumento'; 

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode); // Alternar entre mostrar y ocultar los botones de editar/borrar
    };

    const handleDeleteSong = () => {
        setIsDeleteModalVisible(true); // Mostrar el modal de confirmación
    };

    const handleGroupInformation = () => {
        navigation.navigate('GroupInformation', { ownerId: 123, name: 'Group Name', id: 'MX123435', password: 'ABCDE1234' }); // Navegar a la pantalla de información del grupo
    }

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

    const handleViewSong = () => {
        navigation.navigate('ViewSong'); // Navegar a la pantalla de vista de canción
    }


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
                        <Text style={styles.titleText}>Miembros</Text>
                        <TouchableOpacity onPress={handleEditToggle}>
                            <Icon name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.songList}>
                        <View style={styles.songItem}>
                            <View style={styles.songImageContainer}>
                                <Icon name="person" size={50} color="#FFF7EE" />
                            </View>
                            <View>
                                <Text style={styles.memberName}>{memberName}</Text>
                                <Text style={styles.instrument}>{instrument}</Text>
                            </View>
                            {isEditMode && (
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity onPress={handleDeleteSong}>
                                        <Icon name="delete" size={35} color="#4A1900" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                
            </ScrollView>

            {/* Botón flotante */}
                <TouchableOpacity style={styles.floatingButton} onPress={handleGroupInformation}>
                    <Icon name="share" size={30} color="#FFF" />
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
                            ¿Estás seguro de que deseas eliminar a este miembro?
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
                            El miembro se eliminó correctamente
                        </Text>
                        <Icon name="check-circle" size={50} color="#4A1900" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Members;