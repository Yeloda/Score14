import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../screens/HomeScreen";

import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const AppNavigator = (props) => {

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>

            <FlashMessage position="top" statusBarHeight={50}/>
        </>
    )
}

export default AppNavigator

const styles = StyleSheet.create({

})