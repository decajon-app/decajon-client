import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6EDE1',
    },
    content: {
      padding: 10,
      paddingTop: 70,
    },
    greeting: {
      fontSize: 28,
      marginVertical: 20,
      color: '#4A1900',
      fontWeight: 'bold'
    },
    section: {
      marginBottom: 30,
      padding: 10
    },
    sectionTitle: {
      fontSize: 20,
      marginBottom: 10,
      color: '#4A1900',
      textAlign: 'center'
    },
    card: {
      padding: 20,
      backgroundColor: '#FFF7EE',
      borderColor: '#4A1900',
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
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: '#FFF7EE',
      borderColor: '#4A1900',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginBottom: 10,
      borderRadius: 10,
    },
    cardText: {
      marginTop: 10,
      fontSize: 14,
      color: '#4A1900',
      textAlign: 'center',
    },
    cardTextContainer: {
      justifyContent: 'center'
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    iconMenu: { 
      marginRight: 10,
      color: '#4A1900',
    },
    menuText: {
      fontSize: 18,
      color: '#4A4A4A',
    },
    menuTextName: {
      fontSize: 28,
      color: '#4A1900',
      fontWeight: 'bold',
    },
    logOut: {
      fontSize: 18,
      color: '#4A1900',
      fontWeight: 'bold',
      marginTop: 10,
    },
    logOutItem: {
      paddingLeft: 5,
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