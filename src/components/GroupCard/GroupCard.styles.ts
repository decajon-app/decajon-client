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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A1900',
    },
    miembros: {
        fontSize: 16,
    },
});

export default styles;