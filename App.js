import React, { useEffect, useState } from 'react';

import * as eva from '@eva-design/eva';
import { StatusBar } from "expo-status-bar";
import { getLocales } from "react-native-localize";
import * as SplashScreen from 'expo-splash-screen';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import mobileAds from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import AppNavigator from "./navigation/AppNavigator"
import { GlobalContext } from "./contexts/GlobalContext";
import { default as theme } from './assets/custom-theme.json';

SplashScreen.preventAutoHideAsync();

const firstColor = "#5CE0E6"
const secondColor = "#0A0C6A"

import 'moment';
import 'moment/locale/fr'; 

import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : Platform.OS == 'ios' ? 'ca-app-pub-6675990995324469/8021711542' : 'ca-app-pub-6675990995324469/6316225123';
const adBannerId = __DEV__ ? TestIds.ADAPTIVE_BANNER : Platform.OS == 'ios' ? 'ca-app-pub-6675990995324469/8824862606' : 'ca-app-pub-6675990995324469/3329332651';

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export default function App() {

    const [isLoading, setIsLoading] = useState(true)

    const [firstAd, setFirstAd] = useState(true)
    const [firstProD2Ad, setFirstProD2Ad] = useState(true)
    const [firstLigue1Ad, setFirstLigue1Ad] = useState(true)
    const [firstBasketAd, setFirstBasketAd] = useState(true)
    const [firstFormule1Ad, setFirstFormule1Ad] = useState(true)
    const [isFrench, setIsFrench] = useState(false)


    useEffect(() => {
        checkAds()
        // checkLocale()

        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setIsLoading(false);
        });
        const unloaded = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            interstitial.load();
        });
      
        // Start loading the interstitial straight away
        interstitial.load();
    
        // Unsubscribe from events on unmount
        return unsubscribe, unloaded;

        async function checkAds(){
            if(Platform.OS == 'ios'){
                const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
                if (result === RESULTS.DENIED) {
                  // The permission has not been requested, so request it.
                  await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
                }
            }

            const adapterStatuses = mobileAds().initialize()
        }
    }, [])

    async function checkLocale(){
        const result = getLocales()
        if(result[0].languageCode == 'fr'){
            setIsFrench(true)
        }
    }
    

    return(
        <>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar style="light"/>
            <SafeAreaProvider>
                <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                    <GlobalContext.Provider value={{
                        isLoading,
                        setIsLoading,
                        firstAd,
                        setFirstAd,
                        interstitial,
                        firstProD2Ad,
                        setFirstProD2Ad,
                        firstLigue1Ad,
                        setFirstLigue1Ad,
                        firstFormule1Ad,
                        setFirstFormule1Ad,
                        firstBasketAd,
                        setFirstBasketAd,
                        adBannerId,
                        isFrench, 
                        setIsFrench
                    }}>
                        <AppNavigator />
                    </GlobalContext.Provider>
                </ApplicationProvider>        
            </SafeAreaProvider>    
        </>
    )
}