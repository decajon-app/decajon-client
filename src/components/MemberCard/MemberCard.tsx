import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupMemberDto } from '../../models';
import styles from "./MemberCard.styles";

interface MemberCardProps {
    item: GroupMemberDto;
    isEditMode: boolean;
    handleDeleteMember: (memberId: number) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ item, isEditMode, handleDeleteMember }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Icon name="person" size={50} color="#FFF7EE" />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.memberName}>{`${item.firstName} ${item.lastName}`}</Text>
            </View>
            {isEditMode && (
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