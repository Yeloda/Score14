import React, { useState } from 'react';

import * as eva from '@eva-design/eva';
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import AppNavigator from "./navigation/AppNavigator"
import { GlobalContext } from "./contexts/GlobalContext";
import { default as theme } from './assets/custom-theme.json';

SplashScreen.preventAutoHideAsync();

const firstColor = "#5CE0E6"
const secondColor = "#0A0C6A"

import 'moment';
import 'moment/locale/fr'; 

export default function App() {
    const [isLoading, setIsLoading] = useState(false)

    return(
        <>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar style="light"/>
            <SafeAreaProvider>
                <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                    <GlobalContext.Provider value={{
                        isLoading,
                        setIsLoading,
                    }}>
                        <AppNavigator />
                    </GlobalContext.Provider>
                </ApplicationProvider>        
            </SafeAreaProvider>    
        </>
    )
}