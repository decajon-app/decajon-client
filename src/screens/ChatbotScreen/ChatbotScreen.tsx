import { StackScreenProps } from "@react-navigation/stack";
import { ChatbotStackParamsList } from "../../types/navigation";
import React from "react";
import { View, Text } from "react-native";

// Definir las props para esta pantalla, usar el ParamsList correcto
type ChatbotScreenProps = StackScreenProps<ChatbotStackParamsList, 'Chatbot'>;

// Componente principal
const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ navigation, route }) => {
    return (
        <View>
            <Text>
                Pantalla del chatbot
            </Text>
        </View>
    );
};

export default ChatbotScreen;