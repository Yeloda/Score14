import React, { useContext } from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { GlobalContext } from '../contexts/GlobalContext'

import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import moment from 'moment'

const ChooseSportScreen = ({navigation, route}) => {

    const { adBannerId, isFrench } = useContext(GlobalContext);

    return (
        <View style={{flex: 1, backgroundColor: '#333',}}>
            <ScrollView>

                <View style={{height: 50, width: '100%',alignItems:'center',justifyContent:'center',marginTop: 30,}}>
                    <Text style={{color:'white',fontSize: 18,}}>{isFrench ? 'Choisissez un sport' : 'Choose a sport'}</Text>
                </View>


                {/* 5eme ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginBottom: 10,}}>

                    <TouchableOpacity 
                        style={{width:'85%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',alignSelf:'center',}}
                        onPress={() => navigation.navigate(isFrench ? 'Tous les sports' : 'All Sports')}
                    >
                        <Image
                            style={{height: 50,width:'auto',}}
                            resizeMode='contain'
                            source={require('../assets/all_sports_2.webp')}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>{isFrench ? 'Tous les sports' : 'All Sports'}</Text>
                    </TouchableOpacity>
                </View>


                {/* 1ere ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 0}}>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',}}
                        onPress={() => navigation.navigate('Top 14')}
                    >
                        <Image
                            style={{height: 50,width:'auto',}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/rugby/leagues/16.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>Top 14</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',}}
                        onPress={() => navigation.navigate('ProD2')}
                    >
                        <Image
                            style={{height: 50,width:'auto',}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/rugby/leagues/17.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>ProD2</Text>
                    </TouchableOpacity>
                </View>






                {/* 2eme ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 10,}}>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                        onPress={() => navigation.navigate('Champions Cup')}
                    >
                        <Image
                            style={{height: 50,width:'auto'}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/rugby/leagues/54.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 5,fontWeight: 'bold',fontSize: 18,}}>Champions Cup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                        onPress={() => navigation.navigate('Rugby International')}
                    >
                        <Image
                            style={{height: 50,width:'auto'}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/rugby/leagues/85.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 5,fontWeight: 'bold',fontSize: 16,}}>Rugby{"\n"}International</Text>
                    </TouchableOpacity>
                </View>


                {Platform.OS !== 'ios' && moment().format('YYYY-MM-DD') > moment('2024-07-25').format('YYYY-MM-DD') && (
                    <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 10,}}>
                        <TouchableOpacity 
                            style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                            onPress={() => navigation.navigate('Ligue 1')}
                        >
                            <Image
                                style={{height: 50,width:'auto'}}
                                resizeMode='contain'
                                source={{uri: "https://media.api-sports.io/football/leagues/61.png"}}
                            />
                            <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>Ligue 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                            onPress={() => navigation.navigate('Premier League')}
                        >
                            <Image
                                style={{height: 50,width:'auto'}}
                                resizeMode='contain'
                                source={{uri: "https://media.api-sports.io/football/leagues/39.png"}}
                            />
                            <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>Premier League</Text>
                        </TouchableOpacity>
                    </View>
                )}


                {/* 4eme ligne */}
                <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 10,}}>
                    {Platform.OS !== 'ios' && moment().format('YYYY-MM-DD') > moment('2024-07-25').format('YYYY-MM-DD') ? (
                        <TouchableOpacity 
                            style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                            onPress={() => navigation.navigate(isFrench ? 'Ligue des Champions' : 'Champion\'s League')}
                        >
                            <Image
                                style={{height: 50,width:'auto',}}
                                resizeMode='contain'
                                source={{uri: "https://media.api-sports.io/football/leagues/2.png"}}
                            />
                            <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>
                                {isFrench ? 'Ligue des Champions' : 'Champion\'s League'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity 
                            style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                            onPress={() => navigation.navigate(isFrench ? 'Formule 1' : 'Formula 1')}
                        >
                            <Image
                                style={{height: 50,width:'auto',}}
                                resizeMode='contain'
                                source={require('../assets/F1-logo.png')}
                            />
                            <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>{isFrench ? 'Formule 1' : ' Formula 1'}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                        onPress={() => navigation.navigate('NBA')}
                    >
                        <Image
                            style={{height: 50,width:'auto'}}
                            resizeMode='contain'
                            source={{uri: "https://media.api-sports.io/basketball/leagues/12.png"}}
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>NBA</Text>
                    </TouchableOpacity>
                </View>








                {Platform.OS !== 'ios' && moment().format('YYYY-MM-DD') > moment('2024-07-25').format('YYYY-MM-DD') && (
                    <View style={{flexDirection:'row',justifyContent:'center',gap: 15,alignItems:'center',marginTop: 10,}}>
                        <TouchableOpacity 
                            style={{width:'40%', padding: 20,borderRadius: 15,backgroundColor: 'white',height: 150,justifyContent:'center',}}
                            onPress={() => navigation.navigate(isFrench ? 'Formule 1' : 'Formula 1')}
                        >
                            <Image
                                style={{height: 50,width:'auto',}}
                                resizeMode='contain'
                                source={require('../assets/F1-logo.png')}
                            />
                            <Text style={{textAlign: 'center',marginTop: 10,fontWeight: 'bold',fontSize: 18,}}>{isFrench ? 'Formule 1' : ' Formula 1'}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{height: 150}}/>
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