import React, { useEffect } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as SplashScreen from 'expo-splash-screen';
import CustomDrawer from '../components/CustomDrawer';
import BottomTabsNavigator from '../navigation/BottomTabsNavigator'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import FootballNavigator from '../navigation/FootballNavigator';
import ProD2Navigator from '../navigation/ProD2Navigator';
import BasketNavigator from '../navigation/BasketNavigator';
import Formule1Navigator from '../navigation/Formule1Navigator';

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
                drawerActiveBackgroundColor: '#333333',
                drawerInactiveBackgroundColor: '#333333',
                drawerActiveTintColor: '#48b8f9',
                drawerInactiveTintColor: 'white',
                drawerContentStyle: {
                    backgroundColor: '#333333',
                },
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                },
                drawerStyle: {
                    backgroundColor: '#333333',
                },
                drawerItemStyle: {
                    marginTop: -2,
                }
            }}
        >
            <Drawer.Screen
                name="Top 14"
                component={BottomTabsNavigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="sports-rugby" size={22} color={color} />
                        // <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            />
            
            <Drawer.Screen
                name="Pro D2"
                component={ProD2Navigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="sports-rugby" size={22} color={color} />
                        // <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            />

            <Drawer.Screen
                name="Ligue 1"
                component={FootballNavigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <Ionicons name="football" size={24} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            />

            <Drawer.Screen
                name="NBA"
                component={BasketNavigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <FontAwesome5 name="basketball-ball" size={24} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            />

            <Drawer.Screen
                name="Formule 1"
                component={Formule1Navigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="sports-motorsports" size={24} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
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
