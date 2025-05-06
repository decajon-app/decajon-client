import { StackScreenProps } from "@react-navigation/stack";
import { GroupDto } from "../../models";
import { GroupsStackParamsList } from "../../types/navigation";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";
import { View } from "react-native";
import styles from "./GroupCard.styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { getGroupMembersCount } from "../../api/GroupsApi";

interface GroupItemProps { 
    item: GroupDto, 
    navigation: StackScreenProps<GroupsStackParamsList, 'Groups'>['navigation']; 
}

const GroupCard: React.FC<GroupItemProps> = ({ item, navigation }) => {
    const [memberCount, setMemberCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemberCount = async () => {
            try {
                const membersCount = await getGroupMembersCount(item.id!);
                setMemberCount(membersCount);
            } catch (error: any) {
                setError(error.message);
            }
        };
        fetchMemberCount();
    }, [memberCount]);

    const handleGroupPress = () => {
        navigation.navigate('ViewGroup', { group: item! })
    }

    return (
        <TouchableOpacity  onPress={handleGroupPress}>
            <View style={styles.groupContainer}>
                <Icon name="groups" size={100} color="#4A1900" />
                <View style={styles.groupInformation}>
                    <Text style={styles.name}>{item.name}</Text>
                    {error ? (
                        <Text>{error}</Text>
                    ) : memberCount !== null ? (
                        <Text style={styles.miembros}>{memberCount} miembros</Text>
                    ) : (
                        <Text style={styles.miembros}># Miembros</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default GroupCard;