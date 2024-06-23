import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalContext } from '../../contexts/GlobalContext'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

const { width, height } = Dimensions.get('window')

const ProD2RankingScreen = ({navigation, route}) => {

    const { isLoading, setIsLoading, adBannerId, isFrench } = useContext(GlobalContext);

    const [rankings, setRankings] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)


    useEffect(() => {
        getRanks(false)
    }, [])

    const onRefresh = async () => {
        getRanks(true)
    }

    async function getRanks(doRefresh){
        doRefresh ? setIsRefreshing(true) : setIsLoading(true)

        fetch("https://v1.rugby.api-sports.io/standings?league=17&season=2023", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setRankings([...data.response[0]])
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        }).catch(err => {
            console.log(err);
            alert('Une erreur s\'est produite pendant le chargement')
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
                        style={{width: 30,height: 30,marginLeft: 5}}
                        resizeMode='contain'
                        source={{uri: "https://media.api-sports.io/rugby/leagues/17.png"}}
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
                {!isLoading && rankings.map((e, index) => {

                    let teamName = ''
                    switch (e.team.name) {
                        case "Provence Rugby":
                            teamName = "PR"
                            break;
                        case "Vannes":
                            teamName = "RCV"
                            break;
                        case "Beziers":
                            teamName = "ASBH"
                            break;
                        case "Grenoble FC":
                            teamName = "FCG"
                            break;
                        case "US Dax":
                            teamName = "USD"
                            break;
                        case "CA Brive":
                            teamName = "CAB"
                            break;
                        case "Nevers":
                            teamName = "USON"
                            break;
                        case "Mont-de-Marsan":
                            teamName = "SMR"
                            break;
                        case "Aurillac":
                            teamName = "SA"
                            break;
                        case "Colomiers":
                            teamName = "CR"
                            break;
                        case "Angouleme":
                            teamName = "SA XV"
                            break;
                        case "Valence Romans":
                            teamName = "VRDR"
                            break;
                        case "Agen":
                            teamName = "SUA"
                            break;
                        case "Biarritz Olympique":
                            teamName = "BO"
                            break;
                        case "Montauban":
                            teamName = "USM"
                            break;
                        case "Rouen Normandie":
                            teamName = "RNR"
                            break;
                    
                        default:
                            teamName = e.team.name
                            break;
                    }

                    return(
                        <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
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
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.played}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.win.total}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.draw.total}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.lose.total}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.goals.for - e.goals.against}</Text>
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

export default ProD2RankingScreen

const styles = StyleSheet.create({})