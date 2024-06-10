import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalContext } from '../contexts/GlobalContext'

const { width, height } = Dimensions.get('window')

const RankingScreen = ({navigation, route}) => {

    const { isLoading } = useContext(GlobalContext);

    const [rankings, setRankings] = useState([])

    useEffect(() => {
        getRanks()

        async function getRanks(){
            fetch("https://v1.rugby.api-sports.io/standings?league=16&season=2023", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.rugby.api-sports.io",
                    "x-rapidapi-key": process.env.API_KEY
                }
            })
            .then(response => response.json())
            .then(data => {
                setRankings([...data.response[0]])
            }).catch(err => {
                alert('Une erreur s\'est produite pendant le chargement : '+JSON.stringify(err))
                console.log(err);
            });

        }
    }, [])


    return (
        <View style={{flex: 1}}>
            <View key={Math.random()} style={{flexDirection:'row',backgroundColor: '#333333',height: 90,alignItems:'flex-end',paddingBottom: 15}}>
                <TouchableOpacity 
                    style={{width: '11%',alignItems:'center',justifyContent:'center',paddingLeft: 20}}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Feather name="menu" size={24} color='white' />
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '23%',}}>

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

            {!isLoading && rankings.map((e, index) => {

                let teamName = ''
                switch (e.team.name) {
                    case "Stade Toulousain":
                        teamName = "ST"
                        break;
                    case "Stade Francais Paris":
                        teamName = "SFP"
                        break;
                    case "Bordeaux Begles":
                        teamName = "UBB"
                        break;
                    case "RC Toulonnais":
                        teamName = "RCT"
                        break;
                    case "Racing 92":
                        teamName = "R92"
                        break;
                    case "Stade Rochelais":
                        teamName = "SR"
                        break;
                    case "Section Paloise":
                        teamName = "SP"
                        break;
                    case "Castres Olympique":
                        teamName = "CO"
                        break;
                    case "USA Perpignan":
                        teamName = "USAP"
                        break;
                    case "Clermont":
                        teamName = "ASM"
                        break;
                    case "Aviron Bayonnais":
                        teamName = "AB"
                        break;
                    case "Lyon":
                        teamName = "LOU"
                        break;
                    case "Montpellier":
                        teamName = "MHR"
                        break;
                    case "US Oyonnax":
                        teamName = "OR"
                        break;
                
                    default:
                        teamName = e.team.name
                        break;
                }

                return(
                    <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: '6.2%',}}>
                        <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                            <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '23%',}}>
                            <Image
                                style={{width: 28, height: 28}}
                                resizeMode='contain'
                                source={{uri: e.team.logo == 'https://media.api-sports.io/rugby/teams/0.png' ? 'https://media.api-sports.io/rugby/teams/100.png' : e.team.logo}}
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
        </View>
    )
}

export default RankingScreen

const styles = StyleSheet.create({})