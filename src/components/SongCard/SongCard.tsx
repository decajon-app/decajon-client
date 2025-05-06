import { TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";
import { View } from "react-native";
import styles from "./SongCard.styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RepertoireSongCardDto } from "../../models/RepertoireDto";

interface SongItemProps { 
    item: RepertoireSongCardDto,
    isEditMode: boolean,
    handleViewSong: () => void,
    handleEditSong: () => void,
    handleDeleteSong: () => void
}

const SongCard: React.FC<SongItemProps> = ({ 
    item, isEditMode, handleViewSong, handleEditSong, handleDeleteSong 
}) => {
    return (
        <View style={styles.songList}>
            <TouchableOpacity style={styles.songItem} onPress={handleViewSong}>
            <View style={styles.songImageContainer}>
                <Icon name="multitrack-audio" size={50} color="#FFF7EE" />
            </View>
            <View>
                <Text style={styles.songName}>{item.song}</Text>
                <Text style={styles.songDetails}>{item.artist}</Text>
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

export default SongCard;