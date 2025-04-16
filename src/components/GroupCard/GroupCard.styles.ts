import { StackScreenProps } from "@react-navigation/stack";
import { GroupDto } from "../../models";
import { GroupsStackParamsList } from "../../types/navigation";
import { TouchableOpacity } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

interface GroupItemProps { 
    item: GroupDto, 
    navigation: StackScreenProps<GroupsStackParamsList, 'Groups'>['navigation']; 
}

const GroupCard: React.FC<GroupItemProps> = ({ item, navigation }) => {
    return (
            
    );
};

export default GroupCard;