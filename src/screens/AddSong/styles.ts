import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#F6EDE1',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F6EDE1',
    },
    headerLogo: {
        backgroundColor: '#FFF7EE',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingTop: 10,
        paddingBottom: 5, 
    },
    logo: {
        width: 160,
        height: 60,
        borderRadius: 10,
    },
    titleTop: {
        marginTop: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    songImageContainer: {
        width: 200,
        height: 200,
        marginVertical: 25,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#4A1900',
        borderRadius: 10,
    },
    form: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    inputLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: '#200606',
        backgroundColor: '#FFF7EE',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 5,
        marginVertical: 5,
        fontSize: 22,
        width: '85%',
    },
    buttonAdd: {
        backgroundColor: '#4A1900',
        padding: 15,
        marginBottom: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '100%',
    },
    buttonCancel: {
        backgroundColor: '#795548',
        padding: 15,
        marginBottom: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    containerBottom: {
        alignItems: 'center',
        marginTop: 20,
        marginLeft: '10%',
        width: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#4A1900',
        marginBottom: 20,
    },


});

export default styles;