import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6EDE1',
      padding: 20,
    },
    content: {
      padding: 20,
    },
    greeting: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 40,
      color: '#4A4A4A',
    },
    newEventButton: {
      backgroundColor: '#4A1900',
      padding: 25,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    newEventText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#4A4A4A',
    },
    card: {
      backgroundColor: '#FDF4E9',
      borderRadius: 10,
      padding: 20,
      borderColor: 'black',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    cardEvent: {
      backgroundColor: '#FDF4E9',
      borderRadius: 10,
      paddingVertical: 60,
      borderColor: 'black',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      alignItems: 'center', // Asegúrate de que el contenido esté centrado
    },
    cardText: {
      marginTop: 10,
      fontSize: 14,
      color: '#4A4A4A',
      textAlign: 'center',
    },
    iconCard: {
      textAlign: 'center',
    },
    groupName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4A4A4A',
      marginBottom: 5,
      textAlign: 'right',
    },
    songTitle: {
      fontSize: 16,
      color: '#4A4A4A',
      marginBottom: 5,
      fontWeight: 'bold',
    },
    songDetails: {
      fontSize: 14,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#F6EDE1',
      borderTopWidth: 1,
      borderColor: '#EDC8A7',
      paddingTop: 15,
    },
    footerItem: {
      alignItems: 'center',
      color: 'black',
    },
    footerText: {
      fontSize: 12,
      color: 'black',
    },
    menu: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      marginLeft: 100,
      paddingTop: 50,
      width: 300,
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    menuItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    menuText: {
      fontSize: 18,
      color: '#4A4A4A',
    },
    closeButton: {
      alignSelf: 'flex-end',
      width: 40,
    },
    closeButtonText: {
      color: '#4A1900',
      fontWeight: 'bold',
      backgroundColor: 'white',
    },
    divider: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginTop: 480,
    },
  });