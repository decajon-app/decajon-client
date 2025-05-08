import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-screens';

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
    titleTop: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    songList: {
        marginTop: 15,
    },  
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderColor: '#795548',
        borderRadius: 15,
        backgroundColor: '#FFF7EE',
    },
    songImageContainer: { 
        marginRight: 10,
        backgroundColor: '#4A1900',
        borderRadius: 10,
        padding: 5,
    },
    songName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A1900',
    },
    songDetails: {
        fontSize: 16,
        color: '#795548',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4A1900',
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 15,
        backgroundColor: '#FFF7EE',
        padding: 5,
        marginLeft: -20,
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
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButtonCancel: {
        backgroundColor: '#795548',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    modalButtonConfirm: {
        backgroundColor: '#4A1900',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },

    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF7EE',
        borderWidth: 0.3,
        borderColor: '#4A1900',
        borderRadius: 8,
        paddingHorizontal: 5,
        width: '60%',
    },

    searchInput: {
        width: '80%',
        color: 'black',
        maxHeight: 40,
        fontSize: 16,
    },

    search: {
        borderLeftColor: 'gray',
        borderLeftWidth: 1,
        paddingLeft: 5,
    },


});

export default styles;