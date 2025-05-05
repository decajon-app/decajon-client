import { StackScreenProps } from "@react-navigation/stack";
import { ChatbotStackParamsList } from "../../types/navigation";
import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./ChatbotScreen.styles";
import { ScrollView } from "react-native-gesture-handler";

// Definir las props para esta pantalla, usar el ParamsList correcto
type ChatbotScreenProps = StackScreenProps<ChatbotStackParamsList, 'Chatbot'>;

type Message = {
    sender: 'user' | 'bot';
    text: string;
    isTyping?: boolean;
  };
  

// Componente principal
const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ navigation, route }) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [typingDots, setTypingDots] = React.useState('');

    const [message, setMessage] = React.useState<string>("");
    const [messages, setMessages] = React.useState<Message[]>([]);

    const isGreeting = (msg: string) =>
        /hola|buenas|qué tal|hey|saludos/i.test(msg);
    
    const isThankYou = (msg: string) =>
        /gracias|muchas gracias|te agradezco/i.test(msg);
    
    const isGroupInfoRequest = (msg: string) =>
        /información.*grupo|info.*grupo|detalles.*grupo/i.test(msg);
    
    const isActionRequest = (msg: string) =>
        /crear|añadir|agregar|eliminar|modificar|editar/i.test(msg);
    
    const generateBotResponse = (msg: string): string => {
        const lower = msg.toLowerCase();
      
        if (/(hola|buenos días|buenas tardes|buenas noches|hey)/.test(lower)) {
          return '¡Hola! ¿En qué puedo ayudarte? 😁';
        }
      
        if (/gracias|te agradezco|mil gracias/.test(lower)) {
          return '¡Por nada, estoy para ayudarte! 😊';
        }
      
        if (/grupo.*(información|detalles)|información.*grupo/.test(lower)) {
          return 'Aquí tienes la información del grupo.';
        }
      
        if (/canciones?|eventos?|ensayos?|miembros?/.test(lower) && /(mostrar|ver|lista|detalles|hay)/.test(lower)) {
          return 'Aquí está la información solicitada.';
        }
      
        if (/agregar|añadir|crear|eliminar|borrar|modificar|editar/.test(lower)) {
          return 'La acción se realizó correctamente. ✅';
        }

        if (/ola|Ola/.test(lower)) {
            return 'Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 😂';
        }
      
        return 'Lo siento, no entendí tu mensaje. ¿Podrías reformularlo? 🤔';
    };
      
          
      React.useEffect(() => {
        let interval: NodeJS.Timeout;
      
        // Solo activa la animación si hay un mensaje con isTyping
        if (messages.some((msg) => msg.isTyping)) {
          let dotCount = 0;
          interval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            setTypingDots('.'.repeat(dotCount));
          }, 300);
        } else {
          setTypingDots('');
        }
      
        return () => clearInterval(interval);
      }, [messages]);
      

      const handleSendMessage = () => {
        if (message.trim() !== "") {
          const userMessage = message.trim();
          const botReply = generateBotResponse(userMessage);
      
          const userMsgObj: Message = { sender: "user", text: userMessage };
          const typingMsgObj: Message = { sender: "bot", text: "", isTyping: true };
      
          setMessages((prevMessages) => [...prevMessages, userMsgObj, typingMsgObj]);
      
          setTimeout(() => {
            setMessages((prevMessages) => {
              // Elimina el último mensaje que es el que tiene isTyping
              const updatedMessages = prevMessages.slice(0, -1);
              const botMsgObj: Message = { sender: "bot", text: botReply };
              return [...updatedMessages, botMsgObj];
            });
          }, 2000);
      
          setMessage("");
        }
      };
      

    const handleRestoreChat = () => {
        setMessages([]);
        setMessage("");
    };
    
    return (
        <View style={styles.container}>
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
                <ScrollView
                    style={styles.messageList}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((msg, index) => (
                        <View key={index} style={msg.sender === 'user' ? styles.messageRowUser : styles.messageRowBot}>
                            {msg.sender === 'bot' && <Icon name="smart-toy" size={24} color="white" style={styles.iconBot} />}
                            <View style={msg.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleBot}>
                            <Text style={msg.sender === 'user' ? styles.messageTextUser : styles.messageTextBot}>
                                {msg.isTyping ? `Escribiendo${typingDots}` : msg.text}
                            </Text>
                            </View>
                            {msg.sender === 'user' && <Icon name="person" size={24} color="#4A1900" style={styles.iconUser} />}
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
                    placeholder="Mensaje" 
                    placeholderTextColor={'gray'}
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