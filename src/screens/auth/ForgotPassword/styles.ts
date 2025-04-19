import { StyleSheet } from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6EDE1',
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
        padding: 20,
        marginTop: 20,
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
      },
      subtitle: {
        paddingVertical: 20,
        fontSize: 22,
      },
      form: {
        padding: 20,
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
      button: {
        backgroundColor: '#200606',
        padding: 15,
        marginTop: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '80%',
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
        flexDirection: 'row',
        alignItems: 'center',
      },
      btnContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 50,
      },
      btn: {
        backgroundColor: '#200707',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginLeft: 20,
        alignItems: 'center',
      },
      iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      },
});