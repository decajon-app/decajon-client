import { StyleSheet } from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6EDE1',
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#FFF7EE',
        padding: 10,
        paddingTop: 25,
        marginHorizontal: 25,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 20,
    },
    body: {
        padding: 0,
        paddingTop: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#200606',
        marginLeft: 25,
    },
    image: {
        width: '100%',
        height: 120,
    },
    form: {
        paddingTop: 20,
        alignItems: 'center',
    },
    input: {
        color: '#200606',
        backgroundColor: '#FFF7EE',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 5,
        marginVertical: 5,
        fontSize: 22,
        width: '75%',
    },
    forgotPassword: {
        width: '85%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    logContainer: {
        position: 'relative',
        top: '40%',
        alignItems: 'center',
        width: '70%',
    },
    inputPassword: {
        color: '#200606',
        backgroundColor: '#FFF7EE',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 5,
        marginVertical: 10,
        fontSize: 22,
        width: '75%',
    },
    showPassword: {
        marginLeft: -45,
    },
    emailInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#200606',
        padding: 15,
        marginBottom: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#200606',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 16,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    createAccount: {
        padding: 20,
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 22,
        color: '#200606',
        fontWeight: 'bold',
        marginTop: -15,
    },
    txt: {
        color: '#763F0F',
        fontSize: 20,
    },
});