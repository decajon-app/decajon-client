import { StackScreenProps } from "@react-navigation/stack";
import { GroupDto } from "../../models";
import { GroupsStackParamsList } from "../../types/navigation";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";
import { View } from "react-native";
import styles from "./SongCard.styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SongItemProps { 
    item: RepertoireSongDto,
    navigation: StackScreenProps<GroupsStackParamsList, 'Groups'>['navigation']; 
}

const SongCard: React.FC<SongItemProps> = ({ item, navigation, route }) => {
    const { handleViewSong } = route.params;
    const { handleEditSong } = route.params;
    const { handleDeleteSong } = route.params;
    const { isEditMode } = route.params;

    return (
        <View style={styles.songList}>
            <TouchableOpacity style={styles.songItem} onPress={handleViewSong}>
            <View style={styles.songImageContainer}>
                <Icon name="multitrack-audio" size={50} color="#FFF7EE" />
            </View>
            <View>
                <Text style={styles.songName}>{songName}</Text>
                <Text style={styles.songDetails}>{songDetails}</Text>
            </View>
            {isEditMode && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={handleEditSong}>
                        <Icon name="edit" size={35} color="#4A1900" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteSong}>
                        <Icon name="delete" size={35} color="#4A1900" />
                    </TouchableOpacity>
                </View>
            )}
            </TouchableOpacity>
        </View>
    );
};

export default GroupCard;