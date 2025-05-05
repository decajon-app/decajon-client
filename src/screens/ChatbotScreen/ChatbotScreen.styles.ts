import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    containerExample: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textExample: {
        fontSize: 20,
        color: '#4A1900',
        textAlign: 'center',
        fontStyle: 'italic',
        marginHorizontal: 10,
    },
    examples: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    example: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        backgroundColor: '#4A1900',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 3,
        position: 'absolute',
        left: 5,
        bottom: 5,
        zIndex: 1,
    },
    iconSend: {
        backgroundColor: '#4A1900',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 12,
        position: 'absolute',
        right: 0,
        bottom: -5,
    },
    messageInput: {
        color: '#4A1900',
        backgroundColor: 'white',
        borderWidth: 0.1,
        borderColor: '#4A1900',
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        width: '90%',
        paddingLeft: 50,
        paddingRight: 20,
        marginRight: 50,
        maxHeight: 120,
    },
    messageList: {
        flex: 1,
        marginTop: 60,
        marginBottom: 15,
        marginHorizontal: -10,
    },
    messageContainer: {
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#FFF7EE',
        borderRadius: 10,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
        borderWidth: 0.1,
        borderColor: '#4A1900',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFF7EE',
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
      },
      
      botMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#4A1900',
        borderBottomLeftRadius: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
      },
      
      botMessage: {
        color: 'white',
        fontSize: 18,
      },
      
      sentMessage: {
        fontSize: 18,
        color: '#4A1900',
      },
      
    
    iconLeft: {
        marginRight: 8,
        marginBottom: 4,
    },
    
    iconRight: {
        marginLeft: 8,
        marginBottom: 4,
    },

    messageRowUser: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 4,
        marginRight: 10,
      },
      
      messageRowBot: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginVertical: 4,
        marginLeft: 10,
      },
      
      messageBubbleUser: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        maxWidth: '75%',
        borderBottomRightRadius: 0,
        borderWidth: 0.5,
        borderColor: '#4A1900',
      },
      
      messageBubbleBot: {
        backgroundColor: '#4A1900',
        borderRadius: 12,
        padding: 10,
        maxWidth: '75%',
        borderBottomLeftRadius: 0,
        borderWidth: 0.5,
        borderColor: '#4A1900',
      },
      
      messageTextUser: {
        color: '#4A1900',
        fontSize: 16,
      },
      
      messageTextBot: {
        color: 'white',
        fontSize: 16,
      },
      
      iconUser: {
        marginLeft: 6,
        marginBottom: 4,
        backgroundColor: 'white',
        padding: 3,
        borderWidth: 0.5,
        borderColor: '#4A1900',
        borderRadius: 50,
      },
      
      iconBot: {
        marginRight: 6,
        marginBottom: 4,
        backgroundColor: '#4A1900',
        padding: 5,
        borderRadius: 50,
      },
      
});

export default styles;