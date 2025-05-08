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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 5,
  },
  buttonExtra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A1900',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleTop: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  list: {
    flex: 1,
  },
  groupCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
  },section: {
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
  floatingButton: {
      position: 'absolute',
      zIndex: 1,
      bottom: 20,
      right: 20,
      backgroundColor: '#4A1900',
      width: 60,
      height: 60,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',

  },
});

export default styles;