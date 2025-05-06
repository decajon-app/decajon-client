import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
    },
});

export default styles;