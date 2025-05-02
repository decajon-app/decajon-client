import { StackScreenProps } from "@react-navigation/stack";
import { ChatbotStackParamsList } from "../../types/navigation";
import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./ChatbotScreen.styles";
import { ScrollView } from "react-native-gesture-handler";

// Definir las props para esta pantalla, usar el ParamsList correcto
type ChatbotScreenProps = StackScreenProps<ChatbotStackParamsList, 'Chatbot'>;

// Componente principal
const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ navigation, route }) => {

    const [message, setMessage] = React.useState<string>("");
    const [messages, setMessages] = React.useState<string[]>([]);

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessage("");
        }
    };

    const handleRestoreChat = () => {
        setMessages([]);
        setMessage("");
    };
    
    return (
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
    
            {messages.length === 0 ? (
                <View style={styles.containerExample}>
                    <Icon name="smart-toy" size={250} color="#4A1900"/>
                    <Text style={styles.textExample}>
                        ¡Hola! ¿Cómo puedo ayudarte?
                    </Text>
    
                    <View style={styles.examples}>
                        <View style={styles.example}>
                            <Icon name="music-note" size={30} color="#4A1900"/>
                            <Text style={styles.textExample}>
                                Agregar canciones
                            </Text>
                        </View>
    
                        <View style={styles.example}>
                            <Icon name="groups" size={30} color="#4A1900"/>
                            <Text style={styles.textExample}>
                                Eliminar grupos
                            </Text>
                        </View>
                        <View style={styles.example}>
                            <Icon name="person" size={30} color="#4A1900"/>
                            <Text style={styles.textExample}>
                                Editar miembros
                            </Text>
                        </View>
                        <View style={styles.example}>
                            <Icon name="calendar-month" size={30} color="#4A1900"/>
                            <Text style={styles.textExample}>
                                Mostrar ensayos
                            </Text>
                        </View>
                    </View>
                </View>
            ) : (
                <ScrollView style={styles.messageList}>
                    {messages.map((msg, index) => (
                        <View key={index} style={styles.messageContainer}>
                            <Text style={styles.sentMessage}>
                                {msg}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
    
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.icon} onPress={handleRestoreChat}>
                    <Icon name="restore" size={30} color="white"/>
                </TouchableOpacity>
                <TextInput
                    style={styles.messageInput}
                    multiline
                    textAlignVertical="top"
                    scrollEnabled
                    placeholder="Tipo de evento"
                    placeholderTextColor={'#4A1900'}
                    onChangeText={setMessage}
                    value={message}
                />
                <TouchableOpacity style={styles.iconSend} onPress={handleSendMessage}>
                    <Icon name="send" size={30} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    );
    
};

export default ChatbotScreen;