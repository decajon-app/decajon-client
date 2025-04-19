import { StyleSheet } from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf2e2',
      },
      headerImg: {
        alignItems: 'center',
        backgroundColor: '#FFF7EE',
        padding: 10,
        paddingTop: 15,
        marginHorizontal: 25,
        marginTop: 30,
        marginBottom: 0,
        borderRadius: 20,
      },
      image: {
          width: '100%',
          height: 120,
      },
      header: {
        paddingLeft: 25,
        marginTop: 10,
      },
      title: {
        fontSize: 35,
        fontWeight: 'bold',
      },
      form: {
        paddingHorizontal: 20,
        paddingVertical: 15,
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
        width: '85%',
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
      inputLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      createAccount: {
        padding: 20,
        alignItems: 'center',
      },
      loginText: {
        fontSize: 22,
        color: '#200606',
        fontWeight: 'bold',
        marginTop: -15,
      },
      txt: {
        color: '#763F0F',
        fontSize: 20,
        paddingTop: 15,
        textAlign: 'center',
      },
      btnContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingRight: 1,
        marginTop: 10,
      },
      btn: {
        backgroundColor: '#200707',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginLeft: 20,
        alignItems: 'center',
      },
      containerBottom: {
        alignItems: 'center',
        marginTop: 20,
        marginLeft: '10%',
        width: '80%',
      },
});