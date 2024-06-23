import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { GlobalContext } from '../contexts/GlobalContext'

import * as SplashScreen from 'expo-splash-screen';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const ChooseSportScreen = ({navigation, route}) => {

    const { adBannerId, isFrench } = useContext(GlobalContext);

    useEffect(() => {
        hideSplashScreen()
    }, [])

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }

    return (
        <View style={{flex: 1, backgroundColor: '#333',}}>
            <ScrollView>
                {/* <TouchableOpacity 
                    style={{alignItems:'flex-end',marginTop: 50,}}
                    onPress={() => navigation.navigate(isFrench ? 'Réglages' : 'Settings')}
                >
                    <Feather name="settings" size={25} color="white" style={{marginRight: 10}} />
                </TouchableOpacity> */}


                {/* 1ere ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 80}}>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: '#f0f0f0',}}
                        onPress={() => navigation.navigate('Euro 2024')}
                    >
                        <Image
                            style={{height: 60,width:'auto'}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/football/leagues/4.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>Euro 2024</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: '#f0f0f0',}}
                        onPress={() => navigation.navigate('Top 14')}
                    >
                        <Image
                            style={{height: 60,width:'auto',}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/rugby/leagues/16.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>Top 14</Text>
                    </TouchableOpacity>
                </View>

                {/* 2eme ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 15,}}>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: '#f0f0f0',}}
                        onPress={() => navigation.navigate('Ligue 1')}
                    >
                        <Image
                            style={{height: 60,width:'auto'}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/football/leagues/61.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>Ligue 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: '#f0f0f0',}}
                        onPress={() => navigation.navigate('ProD2')}
                    >
                        <Image
                            style={{height: 60,width:'auto',}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/rugby/leagues/17.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>ProD2</Text>
                    </TouchableOpacity>
                </View>

                {/* 3eme ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 15,}}>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: '#f0f0f0',}}
                        onPress={() => navigation.navigate('NBA')}
                    >
                        <Image
                            style={{height: 60,width:'auto'}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/basketball/leagues/12.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>NBA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: '#f0f0f0',}}
                        onPress={() => navigation.navigate(isFrench ? 'Formule 1' : 'Formula 1')}
                    >
                        <Image
                            style={{height: 60,width:'auto',}}
                            resizeMode='contain'
                            source={require('../assets/F1-logo.png')}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>{isFrench ? 'Formule 1' : ' Formula 1'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height: 50}}/>
            </ScrollView>


            <View style={{position: 'absolute',bottom: 0}}>
                <BannerAd
                    unitId={adBannerId} 
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
            </View>
        </View>
    )
}

export default ChooseSportScreen

const styles = StyleSheet.create({})