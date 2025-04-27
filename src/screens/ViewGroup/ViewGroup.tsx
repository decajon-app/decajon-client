import { StackScreenProps } from "@react-navigation/stack";
import { GroupsStackParamsList } from '../../types/navigation';
import React from "react";
import styles from "../ViewGroup/styles";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GroupDto } from "../../models";

type ViewGroupScreenProps = StackScreenProps<GroupsStackParamsList, 'ViewGroup'>;

const groupName = 'Nombre del grupo';
const songName = 'Nombre de la canción';
const songDetails = 'Compositor/Cantante';

// Componente principal
const ViewGroup: React.FC<ViewGroupScreenProps> = ({ navigation, route }) => {

    const handleCreateGroup = () => {
        navigation.navigate('CreateGroup');
    }

    const handleJoinGroup = () => {
        navigation.navigate('JoinGroup');
    }

    const handleRepertory = () => {
        navigation.navigate('RepertoryScreen');
    }

    return (            
    <ScrollView> 
        <View style={styles.container}> 
            <View style={styles.headerLogo}>
                <TouchableOpacity /* onPress={toggleMenu} */>
                    <Icon name="account-circle" size={50} color="#4A1900" />
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                <TouchableOpacity /* onPress={toggleCalendar} */>
                  <Icon name="calendar-month" size={50} color="#4A1900" />
                </TouchableOpacity>
            </View>

            <Text style={styles.titleTop}>Nombre del grupo </Text>
            <View style={styles.buttonsTop}>
                <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
                    <Text style={styles.buttonText}>Nuevo evento</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={handleJoinGroup}>
                    <Text style={styles.buttonText}>Miembros</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonExtra}>
                <TouchableOpacity style={styles.button} onPress={handleRepertory}>
                    <Text style={styles.buttonText}>Repertorio</Text>
                </TouchableOpacity>
            </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tus eventos próximos</Text>
                    <TouchableOpacity>
                        <View style={styles.cardEvent}>
                            <Icon style={styles.iconCard} name="thumb-up" size={40} color="#4A1900" />
                            <Text style={styles.cardText}>Ahora mismo no tienes eventos próximos</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Ensayos sugeridos</Text>
                          <TouchableOpacity>
                            <View style={styles.card}>
                              <View style={styles.cardIcon}>
                                <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                              </View>
                              <View style={styles.cardContainer}>
                                <Text style={styles.groupName}>{groupName}</Text>
                                <Text style={styles.songTitle}>{songName}</Text>
                                <Text style={styles.songDetails}>{songDetails}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={styles.card}>
                              <View style={styles.cardIcon}>
                                <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                              </View>
                              <View style={styles.cardContainer}>
                                <Text style={styles.groupName}>{groupName}</Text>
                                <Text style={styles.songTitle}>{songName}</Text>
                                <Text style={styles.songDetails}>{songDetails}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={styles.card}>
                              <View style={styles.cardIcon}>
                                <Icon style={styles.iconCard} name="music-note" size={80} color="#F6EDE1" />
                              </View>
                              <View style={styles.cardContainer}>
                                <Text style={styles.groupName}>{groupName}</Text>
                                <Text style={styles.songTitle}>{songName}</Text>
                                <Text style={styles.songDetails}>{songDetails}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
        </View>
        </ScrollView>
    );
};

export default ViewGroup;