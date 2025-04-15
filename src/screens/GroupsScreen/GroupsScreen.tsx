import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList, GroupsStackParamsList } from "../../types/navigation";
import React from "react";
import { View, Text } from "react-native";

// Definir las props para esta pantalla
type TemplateScreenProps = StackScreenProps<GroupsStackParamsList, 'Groups'>;
// ^^^ AppStackParamList con Welcome es un ejemplo, usar el ParamList adecuado ^^^

// Componente principal
const GroupsScreen: React.FC<TemplateScreenProps> = ({ navigation, route }) => {
    return (
        <View>
            <Text>
                GroupsScreen!!!
            </Text>
        </View>
    );
};

export default GroupsScreen;