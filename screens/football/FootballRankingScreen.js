import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalContext } from '../../contexts/GlobalContext'
import { useFocusEffect } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const FootballRankingScreen = ({navigation, route}) => {

    const { firstPressFootball, setFirstPressFootball, isLoading, setIsLoading } = useContext(GlobalContext);

    const [footballRankings, setFootballRankings] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            if(firstPressFootball){
                setFirstPressFootball(false)
            }
        }, [])
    );

    useEffect(() => {
        getRanks(false)
    }, [])

    const onRefresh = async () => {
        getRanks(true)
    }

    async function getRanks(doRefresh){

        doRefresh ? setIsRefreshing(true) : setIsLoading(true)

        fetch("https://v3.football.api-sports.io/standings?league=61&season=2023", {
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
            alert('Une erreur s\'est produite pendant le chargement : ')
            console.log(err);
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
                        source={{uri: "https://media.api-sports.io/football/leagues/61.png"}}
                    />
                </View>
                <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                </View>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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
                        case "Paris Saint Germain":
                            teamName = "PSG"
                            break;
                        case "Monaco":
                            teamName = "ASM"
                            break;
                        case "Stade Brestois 29":
                            teamName = "BRE"
                            break;
                        case "Lille":
                            teamName = "LIL"
                            break;
                        case "Nice":
                            teamName = "NIC"
                            break;
                        case "Lyon":
                            teamName = "OL"
                            break;
                        case "Lens":
                            teamName = "LEN"
                            break;
                        case "Marseille":
                            teamName = "OM"
                            break;
                        case "Reims":
                            teamName = "REI"
                            break;
                        case "Rennes":
                            teamName = "REN"
                            break;
                        case "Toulouse":
                            teamName = "TOU"
                            break;
                        case "Montpellier":
                            teamName = "MPL"
                            break;
                        case "Strasbourg":
                            teamName = "STR"
                            break;
                        case "Nantes":
                            teamName = "NAN"
                            break;
                        case "LE Havre":
                            teamName = "HAV"
                            break;
                        case "Metz":
                            teamName = "MET"
                            break;
                        case "Lorient":
                            teamName = "LOR"
                            break;
                        case "Clermont Foot":
                            teamName = "CLE"
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
        </View>
    )
}

export default FootballRankingScreen

const styles = StyleSheet.create({})