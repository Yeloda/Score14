import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalContext } from '../../contexts/GlobalContext'
import { useFocusEffect } from '@react-navigation/native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

const { width, height } = Dimensions.get('window')

const PremierLeagueRankingScreen = ({navigation, route}) => {

    const { isLoading, setIsLoading, adBannerId, isFrench } = useContext(GlobalContext);

    const [footballRankings, setFootballRankings] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        getRanks(false)
    }, [])

    const onRefresh = async () => {
        getRanks(true)
    }

    async function getRanks(doRefresh){

        doRefresh ? setIsRefreshing(true) : setIsLoading(true)

        fetch("https://v3.football.api-sports.io/standings?league=39&season=2024", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setFootballRankings([...data.response[0].league.standings[0]])
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        }).catch(err => {
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        });

    }

    return (
        <View style={{flex: 1}}>
            <View key={Math.random()} style={{flexDirection:'row',backgroundColor: '#333333',height: 90,alignItems:'flex-end',paddingBottom: 15}}>
                <TouchableOpacity 
                    style={{width: '11%',alignItems:'center',justifyContent:'center',paddingLeft: 20}}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Feather name="menu" size={24} color='white' />
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '23%',}}>
                    <Image
                        style={{width: 30,height: 30,marginLeft: 5, backgroundColor: 'white',}}
                        resizeMode='contain'
                        source={{uri: "https://media.api-sports.io/football/leagues/39.png"}}
                    />
                </View>
                <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                </View>
            </View>

            {isLoading && (
                <ActivityIndicator style={{marginTop: 100,}} />
            )}

            <ScrollView
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            >
                {!isLoading && footballRankings.map((e, index) => {

                    let teamName = ''
                    switch (e.team.name) {
                        case "Manchester City":
                            teamName = "MCI"
                            break;
                        case "Arsenal":
                            teamName = "ARS"
                            break;
                        case "Liverpool":
                            teamName = "LIV"
                            break;
                        case "Aston Villa":
                            teamName = "AVL"
                            break;
                        case "Tottenham":
                            teamName = "TOT"
                            break;
                        case "Chelsea":
                            teamName = "CHE"
                            break;
                        case "Newcastle":
                            teamName = "NEW"
                            break;
                        case "Manchester United":
                            teamName = "MUI"
                            break;
                        case "West Ham":
                            teamName = "WHM"
                            break;
                        case "Crystal Palace":
                            teamName = "CRY"
                            break;
                        case "Brighton":
                            teamName = "BRI"
                            break;
                        case "Bournemouth":
                            teamName = "BOU"
                            break;
                        case "Fulham":
                            teamName = "FUL"
                            break;
                        case "Wolves":
                            teamName = "WOL"
                            break;
                        case "Everton":
                            teamName = "EVE"
                            break;
                        case "Brentford":
                            teamName = "BRE"
                            break;
                        case "Nottingham Forest":
                            teamName = "NTF"
                            break;
                        case "Luton":
                            teamName = "LUT"
                            break;
                        case "Burnley":
                            teamName = "BUR"
                            break;
                        case "Sheffield Utd":
                            teamName = "SHE"
                            break;
                        case "Ipswich":
                            teamName = "IPS"
                            break;
                        case "Leicester":
                            teamName = "LEI"
                            break;
                        case "Southampton":
                            teamName = "SOU"
                            break;

                        default:
                            teamName = e.team.name
                            break;
                    }


                    return(
                        <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.rank}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '23%',}}>
                                <Image
                                    style={{width: 28, height: 28}}
                                    resizeMode='contain'
                                    source={{uri: e.team.logo}}
                                />
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{teamName}</Text>
                            </View>
                            <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.all.played}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.all.win}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.all.draw}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.all.lose}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.all.goals.for - e.all.goals.against}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.points}</Text>
                            </View>
                        </View>
                    )
                })}

                <View style={{height: 50}}/>
            </ScrollView>

            <BannerAd
                unitId={adBannerId} 
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
        </View>
    )
}

export default PremierLeagueRankingScreen

const styles = StyleSheet.create({})