import { StyleSheet } from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6EDE1',
    },
    content: {
      marginTop: 60,
      padding: 10,
    },
    header: {
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
      borderRadius: 15,
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
      backgroundColor: '#FFF7EE',
      borderColor: '#4A1900',
      borderWidth: 0.2,
      marginBottom: 10,
      borderRadius: 10,
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
      backgroundColor: '#FFF7EE',
      borderColor: '#4A1900',
      borderWidth: 0.2,
      alignItems: 'center', 
      marginBottom: 10,
      borderRadius: 10,
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
    calendar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1,
      marginLeft: 100,
      paddingTop: 10,
      width: 300,
      backgroundColor: '#F6EDE1',
      padding: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    calendarTitle: {
      backgroundColor: '#4A1900',
      padding: 10,
      borderRadius: 10,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      marginTop: 10,
    },
    calendarDays: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    calendarDay: { 
      display: 'flex',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 18,
      backgroundColor: '#4A1900',
      width: 35,
      height: 35,
      borderRadius: 5,
      paddingTop: 5,
    },
    menu: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1,
      marginRight: 100,
      paddingTop: 10,
      width: 300,
      backgroundColor: '#F6EDE1',
      padding: 20,
      borderTopRightRadius: 20,
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
      backgroundColor: '#F6EDE1',
    },
    divider: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginTop: '180%',
    },
  });