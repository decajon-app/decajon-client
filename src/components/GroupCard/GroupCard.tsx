import { StackScreenProps } from "@react-navigation/stack";
import { GroupDto } from "../../models";
import { GroupsStackParamsList } from "../../types/navigation";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";
import { View } from "react-native";
import styles from "./GroupCard.styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface GroupItemProps { 
    item: GroupDto, 
    navigation: StackScreenProps<GroupsStackParamsList, 'Groups'>['navigation']; 
}

const GroupCard: React.FC<GroupItemProps> = ({ item, navigation }) => {
    return (
        <TouchableOpacity  onPress={() => navigation.navigate('GroupInformation', { groupId: item.id })} >
            <View style={styles.groupContainer}>
                <Icon name="groups" size={120} color="#4A1900" />
                <View style={styles.groupInformation}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.miembros}>[#] miembros</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default GroupCard;