import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupMemberDto } from '../../models';
import styles from "./MemberCard.styles";
import { getUserData } from '../../storage/UserStorage';

interface MemberCardProps {
    item: GroupMemberDto;
    isEditMode: boolean;
    handleDeleteMember: (memberId: number) => void;
    role: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ item, isEditMode, handleDeleteMember, role }) => {
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);    
    useEffect(() => {
        const fetchCurrentUserId = async () => {
            const user = await getUserData();
            if(user !== null) {
                setCurrentUserId(user.id);
            }
        };
        fetchCurrentUserId();
    }, []);

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Icon name="person" size={50} color="#FFF7EE" />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.memberName}>{`${item.firstName} ${item.lastName}`}</Text>
            </View>
            {isEditMode && (role === 'OWNER' || role === 'ADMIN') && currentUserId !== item.userId && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={() => handleDeleteMember(item.userId)}>
                        <Icon name="delete" size={35} color="#4A1900" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default MemberCard;