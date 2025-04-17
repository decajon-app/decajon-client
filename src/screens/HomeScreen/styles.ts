import { StyleSheet } from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6EDE1',
    },
    content: {
      marginTop: 50,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: '#F6EDE1',
      padding: 10, 
    },
    logo: {
      width: 160,
      height: 60,
    },
    iconTop: {
      marginLeft: 10,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    greeting: {
      fontSize: 24,
      marginVertical: 20,
      color: '#4A1900',
    },
    newEventButton: {
      backgroundColor: '#4A1900',
      padding: 25,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 30,
      elevation: 10,
    },
    newEventText: {
      color: '#FFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#4A1900',
    },
    card: {
      padding: 20,
      borderColor: '#4A1900',
      borderWidth: 0.2,
      marginBottom: 20,
      borderRadius: 25,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardIcon: {
      backgroundColor: '#4A1900',
      borderRadius: 15, 
      padding: 5,
    },
    cardContainer: {
      flexDirection: 'column',
      marginLeft: 20,
    },
    cardEvent: {
      paddingVertical: 60,
      borderColor: '#4A1900',
      borderWidth: 0.2,
      alignItems: 'center', 
      marginBottom: 20,
      borderRadius: 25,
    },
    cardText: {
      marginTop: 10,
      fontSize: 14,
      color: '#4A1900',
      textAlign: 'center',
    },
    iconCard: {
      textAlign: 'center',
    },
    groupName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4A1900',
      marginBottom: 5,
    },
    songTitle: {
      fontSize: 16,
      color: '#4A1900',
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
      zIndex: 1,
      marginLeft: 100,
      paddingTop: 10,
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
      marginTop: '200%',
    },
  });