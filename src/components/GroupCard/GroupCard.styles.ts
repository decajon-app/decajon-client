import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    groupContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFF7EE',
        padding: 20,
        borderRadius: 15,
        marginBottom: 10,
    },
    groupInformation: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
    },
    miembros: {
        fontSize: 12,
    },
});

export default styles;