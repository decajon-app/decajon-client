import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import { GroupDto, GroupMemberDto } from "../../models";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { deleteGroupMember, getGroupMembersList } from "../../api/GroupsApi";
import { FlatList } from "react-native-gesture-handler";
import MemberCard from "../../components/MemberCard/MemberCard";

type MembersScreenProps = StackScreenProps<GroupsStackParamsList, 'Members'>;

const Members: React.FC<MembersScreenProps> = ({ navigation, route }) => {
    const [isEditMode, setIsEditMode] = useState(false); // Estado para alternar entre modo edición y normal
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de confirmación
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false); // Estado para mostrar el modal de eliminación exitosa

    const [members, setMembers] = useState<GroupMemberDto[]>([]);

    const [memberToDeleteId, setMemberToDeleteId] = useState<number | null>(null);

    const { group } = route.params;
    const { role } = route.params;

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode); // Alternar entre mostrar y ocultar los botones de editar/borrar
    };

    const handleDeleteMember = (userId: number) => {
        if (role === 'OWNER' || role === 'ADMIN') {
            setMemberToDeleteId(userId);
            setIsDeleteModalVisible(true);
        } else {
            Alert.alert("Permiso denegado", "No tienes permiso para eliminar miembros");
        }
    };

    const confirmDelete = async () => {
        if(memberToDeleteId === null) return;
        
        try {
            const response = await deleteGroupMember(group.id!, memberToDeleteId);

            setMembers(prev => prev.filter(m => m.userId !== memberToDeleteId));

            setIsDeletedModalVisible(true);
            setIsDeleteModalVisible(false);

            setTimeout(() => {
                setIsDeletedModalVisible(false);
            }, 1000);
        } catch (error: any) {
            Alert.alert("Error", "No se pudo eliminar al miembro.");
            setIsDeleteModalVisible(false);
        }
    };

    useEffect(() => {
        const fetchGroupMembers = async () => {
            try {
                const membersList: GroupMemberDto[] = await getGroupMembersList(group.id!);
                setMembers(membersList);
            }
            catch (error: any) {
                Alert.alert("No se pudo obtener la lista de miembros.");
            }
        };
        fetchGroupMembers();
    }, []);
    
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
                    <Text style={styles.titleText}>Miembros</Text>
                    {(role === 'OWNER' || role === 'ADMIN') && (
                        <TouchableOpacity onPress={handleEditToggle}>
                            <Icon name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={members}
                    keyExtractor={(member) => String(member.userId)}
                    renderItem={({ item }) => (
                        <MemberCard
                            item={item}
                            isEditMode={isEditMode}
                            handleDeleteMember={handleDeleteMember}
                            role={role}
                        />
                    )}
                />
            </View>

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