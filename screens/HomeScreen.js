import React, { useContext, useEffect } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as SplashScreen from 'expo-splash-screen';
import CustomDrawer from '../components/CustomDrawer';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import FootballNavigator from '../navigation/FootballNavigator';
import ProD2Navigator from '../navigation/ProD2Navigator';
import BasketNavigator from '../navigation/BasketNavigator';
import Formule1Navigator from '../navigation/Formule1Navigator';
import EuroNavigator from '../navigation/EuroNavigator';
import ChooseSportScreen from './ChooseSportScreen';
import Top14Navigator from '../navigation/Top14Navigator';
import { GlobalContext } from '../contexts/GlobalContext';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation, route }) => {

    const { isFrench } = useContext(GlobalContext);

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
                name={isFrench ? 'Accueil' : 'Home'}
                component={ChooseSportScreen}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            />

            <Drawer.Screen
                name="Top 14"
                component={Top14Navigator}
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
                name="ProD2"
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
                name="Euro 2024"
                component={EuroNavigator}
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
                        <FontAwesome5 name="basketball-ball" size={22} color={color} style={{marginRight: 2,marginLeft:3}} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            />

            <Drawer.Screen
                name={isFrench ? 'Formule 1' : 'Formula 1'}
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

            {/* <Drawer.Screen
                name={isFrench ? 'Réglages' : 'Settings'}
                component={Formule1Navigator}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="sports-motorsports" size={24} color={color} />
                    ),
                    headerTitle: () => <></>,
                    headerStyle: { backgroundColor: '#333333', height: 60 },
                }}
            /> */}
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
