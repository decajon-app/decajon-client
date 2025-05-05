import React from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Header.styles';

interface HeaderProps {
  toggleMenu: () => void;
  toggleCalendar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, toggleCalendar }) => {
  return (
      <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu}>
        <Icon name="account-circle" size={50} color="#4A1900" />
      </TouchableOpacity>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <TouchableOpacity onPress={toggleCalendar}>
        <Icon name="calendar-month" size={50} color="#4A1900" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;