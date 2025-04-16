import { StackScreenProps } from "@react-navigation/stack";
import { GroupDto } from "../../models";
import { GroupsStackParamsList } from "../../types/navigation";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";

interface GroupItemProps { 
    item: GroupDto, 
    navigation: StackScreenProps<GroupsStackParamsList, 'Groups'>['navigation']; 
}

const GroupCard: React.FC<GroupItemProps> = ({ item, navigation }) => {
    return (
        <TouchableOpacity>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
};

export default GroupCard;