/**
 * Este archivo tiene como finalidad establecer un template para
 * cuando sea necesario crear nuevas pantallas.
 * 
 * Copiar el contenido entre los comentarios de abajo, pegar en el 
 * nuevo archivo de patanlla creado y reemplazar los nombres necesarios.
 */


// !!! COPIA DESDE AQUI !!!
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../types/navigation";
import React from "react";
import { View, Text } from "react-native";

// Definir las props para esta pantalla
type TemplateScreenProps = StackScreenProps<AppStackParamList, 'Welcome'>;
// ^^^ AppStackParamList con Welcome es un ejemplo, usar el ParamList adecuado ^^^

// Componente principal
const TemplateScreen: React.FC<TemplateScreenProps> = ({ navigation, route }) => {
    return (
        <View>
            <Text>
                ScreenTemplate!!!
            </Text>
        </View>
    );
};

export default TemplateScreen;
// !!! HASTA AQUI !!!