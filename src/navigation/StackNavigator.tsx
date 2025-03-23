/**
 * 1. Importar la screen
 * 2. Agregar al export
 *    Las pantallas pueden recibir parametros
 * 3. Agregarla al NavigationContainer
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoadScreen from '../screens/LoadScreen.tsx';
import PreviewScreen from '../screens/PreviewScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';

import CreateAccount from '../screens/CreateAccount.tsx';
import WelcomeScreen from '../screens/WelcomeScreen.tsx';
import ForgotPassword from '../screens/ForgotPassword.tsx';
import ResetPassword from '../screens/ResetPassword.tsx';
import CreateGroup from '../screens/CreateGroup.tsx';
//import CreateEvent from '../screens/CreateEvent.tsx';
import GroupInformation from '../screens/GroupInformation.tsx';
import { GroupDto } from '../models/GroupDto.ts';
//import JoinGroup from '../screens/JoinGroup.tsx';


//Agregar pantallas faltantes al stack navigator :)
export type RootStackParamList = {
  LoadScreen: undefined;
  PreviewScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  CreateAccount: undefined;
  WelcomeScreen: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  CreateGroup: undefined;
  // CreateEvent: undefined;
  GroupInformation: {groupData: GroupDto};
  // JoinGroup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadScreen" component={LoadScreen} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount}/>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupInformation" component={GroupInformation} />
        {/*
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="JoinGroup" component={JoinGroup} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
