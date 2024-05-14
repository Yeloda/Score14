import React, { useEffect } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as SplashScreen from 'expo-splash-screen';
import CustomDrawer from '../components/CustomDrawer';
import BottomTabsNavigator from '../navigation/BottomTabsNavigator'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation, route }) => {

    useEffect(() => {
        hideSplashScreen()
    }, [])

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }
    
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#212B46',
                drawerInactiveBackgroundColor: '#212B46',
                drawerActiveTintColor: '#48b8f9',
                drawerInactiveTintColor: 'white',
                drawerContentStyle: {
                    backgroundColor: '#212B46',
                },
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                },
                drawerStyle: {
                    backgroundColor: '#212B46',
                },
                drawerItemStyle: {
                    marginTop: -2,
                }
            }}
        >
            <Drawer.Screen
                name="Accueil"
                component={BottomTabsNavigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                    // headerTintColor: '#fff',
                }}
            />
        </Drawer.Navigator>
    )
};

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        height: 170,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#212B46',
    },
    profileContainer: {
        marginTop:40,
        flexDirection: "row",
        alignItems: "center",
    },
    profileName: {
        marginHorizontal: 16,
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 8,
    },
}); 
