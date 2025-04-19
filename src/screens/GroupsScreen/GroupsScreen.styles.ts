import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6EDE1',
  },
  headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginVertical: 25,
      textAlign: 'center',
      color: '#4A1900',
  },
  groupContainer: {
      flex: 1,
  },
  item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      backgroundColor: 'white',
      borderColor: '#4A1900',
      borderRadius: 10,
      marginBottom: 10,
      color: '#4A1900',
  },
  icon: {
      marginRight: 16,
      borderWidth: 1,
      borderColor: '#4A1900',
      borderRadius: 10,
      padding: 5,
      backgroundColor: '#4A1900',
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4A1900',
  },
  buttonContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
  },
  shareButton: {
      backgroundColor: '#200606',
      borderRadius: 50,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
  },
  viewButton: {
      flex: 1,
      backgroundColor: '#200606',
      borderRadius: 50,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export default styles;