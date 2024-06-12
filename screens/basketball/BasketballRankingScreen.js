import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalContext } from '../../contexts/GlobalContext'
import { useFocusEffect } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const BasketRankingScreen = ({navigation, route}) => {

    const { firstPressBasket, setFirstPressBasket, isLoading, setIsLoading, interstitial } = useContext(GlobalContext);

    const [rankingsEst, setRankingsEst] = useState([])
    const [rankingsOuest, setRankingsOuest] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            if(firstPressBasket){
                setFirstPressBasket(false)
                interstitial.show();
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

        fetch("https://v1.basketball.api-sports.io/standings?league=12&season=2023-2024", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {

            let tempEst = []
            let tempOuest = []

            data.response[0].map(e => {
                if(e.group.name == 'Western Conference'){
                    tempOuest.push(e)
                }else if(e.group.name == 'Eastern Conference'){
                    tempEst.push(e)
                }
            })

            setRankingsEst([...tempEst])
            setRankingsOuest([...tempOuest])
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
                    style={{width: '14%',alignItems:'center',justifyContent:'center',paddingLeft: 20}}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Feather name="menu" size={24} color='white' />
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '30%',}}>

                </View>
                <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                </View>
                <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                </View>
                <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>D</Text>
                </View>
                <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>%</Text>
                </View>
            </View>

            {isLoading && (
                <ActivityIndicator style={{marginTop: 100,}} />
            )}

            <ScrollView
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            >

                {!isLoading && (
                    <>
                        <View style={{backgroundColor: '#cfcfcf',padding: 15}}>
                            <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Conférence Est</Text>
                        </View>


                        {rankingsEst.map((e, index) => {

                            let teamName = ''
                            switch (e.team.name) {
                                case "Boston Celtics":
                                    teamName = "BOS"
                                    break;
                                case "New York Knicks":
                                    teamName = "NYK"
                                    break;
                                case "Milwaukee Bucks":
                                    teamName = "MIL"
                                    break;
                                case "Cleveland Cavaliers":
                                    teamName = "CLE"
                                    break;
                                case "Orlando Magic":
                                    teamName = "ORL"
                                    break;
                                case "Indiana Pacers":
                                    teamName = "IND"
                                    break;
                                case "Philadelphia 76ers":
                                    teamName = "PHI"
                                    break;
                                case "Miami Heat":
                                    teamName = "MIA"
                                    break;
                                case "Chicago Bulls":
                                    teamName = "CHI"
                                    break;
                                case "Atlanta Hawks":
                                    teamName = "ATL"
                                    break;
                                case "Brooklyn Nets":
                                    teamName = "BKN"
                                    break;
                                case "Toronto Raptors":
                                    teamName = "TOR"
                                    break;
                                case "Charlotte Hornets":
                                    teamName = "CHA"
                                    break;
                                case "Washington Wizards":
                                    teamName = "WAS"
                                    break;
                                case "Detroit Pistons":
                                    teamName = "DET"
                                    break;
                                default:
                                    teamName = e.team.name
                                    break;
                            }

                            return(
                                <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '30%',}}>
                                        <Image
                                            style={{width: 28, height: 28}}
                                            resizeMode='contain'
                                            source={{uri: e.team.logo}}
                                        />
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{teamName}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.played}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.win.total}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.lose.total}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>
                                            {e.games.win.percentage.slice(-1)[0] == '0' ? (
                                                (parseFloat(e.games.win.percentage)*100).toString().slice(0,2)
                                            ) : (
                                                (parseFloat(e.games.win.percentage)*100).toFixed(1)
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}

                        <View style={{backgroundColor: '#cfcfcf',padding: 15,marginTop: 20,}}>
                            <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Conférence Ouest</Text>
                        </View>

                        {rankingsOuest.map((e, index) => {

                            let teamName = ''
                            switch (e.team.name) {
                                case "Oklahoma City Thunder":
                                    teamName = "OKC"
                                    break;
                                case "Denver Nuggets":
                                    teamName = "DEN"
                                    break;
                                case "Minnesota Timberwolves":
                                    teamName = "MIN"
                                    break;
                                case "Los Angeles Clippers":
                                    teamName = "LAC"
                                    break;
                                case "Dallas Mavericks":
                                    teamName = "DAL"
                                    break;
                                case "Phoenix Suns":
                                    teamName = "PHX"
                                    break;
                                case "Los Angeles Lakers":
                                    teamName = "LAL"
                                    break;
                                case "New Orleans Pelicans":
                                    teamName = "NOP"
                                    break;
                                case "Sacramento Kings":
                                    teamName = "SAC"
                                    break;
                                case "Golden State Warriors":
                                    teamName = "GSW"
                                    break;
                                case "Houston Rockets":
                                    teamName = "HOU"
                                    break;
                                case "Utah Jazz":
                                    teamName = "UTA"
                                    break;
                                case "Memphis Grizzlies":
                                    teamName = "MEM"
                                    break;
                                case "San Antonio Spurs":
                                    teamName = "SAS"
                                    break;
                                case "Portland Trail Blazers":
                                    teamName = "POR"
                                    break;

                                default:
                                    teamName = e.team.name
                                    break;
                            }


                            return(
                                <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '30%',}}>
                                        <Image
                                            style={{width: 28, height: 28}}
                                            resizeMode='contain'
                                            source={{uri: e.team.logo}}
                                        />
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{teamName}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.played}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.win.total}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.lose.total}</Text>
                                    </View>
                                    <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>
                                            {e.games.win.percentage.slice(-1)[0] == '0' ? (
                                                (parseFloat(e.games.win.percentage)*100).toString().slice(0,2)
                                            ) : (
                                                (parseFloat(e.games.win.percentage)*100).toFixed(1)
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </>
                )}

                <View style={{height: 50}}/>
            </ScrollView>
        </View>
    )
}

export default BasketRankingScreen

const styles = StyleSheet.create({})