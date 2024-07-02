import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { GlobalContext } from '../../contexts/GlobalContext'

import { Feather } from '@expo/vector-icons'
import SwitchSelector from "react-native-switch-selector";
import { useFocusEffect } from '@react-navigation/native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const { width, height } = Dimensions.get('window')

const ChampionsCupRankingScreen = ({navigation, route}) => {

    const { isLoading, setIsLoading, adBannerId, isFrench } = useContext(GlobalContext);

    const [tousRankings, setTousRankings] = useState([])
    const [aRankings, setARankings] = useState([])
    const [bRankings, setBRankings] = useState([])
    const [cRankings, setCRankings] = useState([])
    const [dRankings, setDRankings] = useState([])
    const [eRankings, setERankings] = useState([])
    const [fRankings, setFRankings] = useState([])



    const [isRefreshing, setIsRefreshing] = useState(false)

    const [ordre, setOrdre] = useState('tout')

    useEffect(() => {
        getRanks(false)
    }, [])

    const onRefresh = async () => {
        getRanks(true)
    }

    async function getRanks(doRefresh){

        doRefresh ? setIsRefreshing(true) : setIsLoading(true)

        fetch("https://v1.rugby.api-sports.io/standings?league=54&season=2024", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.response[0]){
                setTousRankings([...data.response[0]])
                setARankings([...data.response[0].filter(e => e.group.name == 'Group 1')])
                setBRankings([...data.response[0].filter(e => e.group.name == 'Group 2')])
                setCRankings([...data.response[0].filter(e => e.group.name == 'Group 3')])
                setDRankings([...data.response[0].filter(e => e.group.name == 'Group 4')])
                setERankings([...data.response[0].filter(e => e.group.name == 'Group 5')])
                setFRankings([...data.response[0].filter(e => e.group.name == 'Group 6')])

                doRefresh ? setIsRefreshing(false) : setIsLoading(false)
            }else{
                fetch("https://v1.rugby.api-sports.io/standings?league=54&season=2023", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "v1.rugby.api-sports.io",
                        "x-rapidapi-key": process.env.API_KEY
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.response[0]){
                        setTousRankings([...data.response[0]])
                        setARankings([...data.response[0].filter(e => e.group.name == 'Group 1')])
                        setBRankings([...data.response[0].filter(e => e.group.name == 'Group 2')])
                        setCRankings([...data.response[0].filter(e => e.group.name == 'Group 3')])
                        setDRankings([...data.response[0].filter(e => e.group.name == 'Group 4')])
                        setERankings([...data.response[0].filter(e => e.group.name == 'Group 5')])
                        setFRankings([...data.response[0].filter(e => e.group.name == 'Group 6')])
                    }
                    doRefresh ? setIsRefreshing(false) : setIsLoading(false)
                }).catch(err => {
                    console.log(err);
                    doRefresh ? setIsRefreshing(false) : setIsLoading(false)
                });
            }
        }).catch(err => {
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

                <View>
                    <Image
                        style={{width: 30,height: 30,marginLeft: 29,backgroundColor: 'white',}}
                        resizeMode='contain'
                        source={{uri: "https://media.api-sports.io/football/leagues/4.png"}}
                    />
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator style={{marginTop: 100,}} />
            ) : (
                <View style={{backgroundColor: '#cfcfcf',padding: 15}}>

                    <SwitchSelector
                        initial={0}
                        options={[{label:'Tout',value:'tout'},{label:'A',value:'a'},{label:'B',value:'b'},{label:'C',value:'c'},{label:'D',value:'d'}]}
                        onPress={val => setOrdre(val)}
                        buttonColor="#333"
                        backgroundColor="#bdbdbd"
                        textColor='white'
                        borderRadius={8}
                        style={{width:width-30,alignSelf: 'center',}}
                    />
                </View>
            )}

            <ScrollView
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            >
                {!isLoading && ordre == 'tout' && tousRankings.map((e, index) => {

                    if(index == 0 || index % 6 == 0){
                        return(
                            <View key={Math.random()}>
                                <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                                    <View key={Math.random()} style={{flexDirection:'row',alignItems:'flex-end',}}>
                
                                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                            <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>{e.group.name}</Text>
                                        </View>
                
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '11%'}} />
                
                                        <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                            <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                                        </View>
                                        <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                            <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                                        </View>
                                        <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                            <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                                        </View>
                                        <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                            <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                                        </View>
                                        <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                            <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                                        </View>
                                        <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                            <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                                        </View>
                                    </View>
                                </View>

                                <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                                    <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '27%',}}>
                                        <Image
                                            style={{width: 28, height: 28}}
                                            resizeMode='contain'
                                            source={{uri: e.team.logo == 'https://media.api-sports.io/rugby/teams/0.png' ? 'https://media.api-sports.io/rugby/teams/100.png' : e.team.logo}}
                                        />
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
                                    </View>
                                    <View style={{width: '9%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.played}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.win.total}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.draw.total}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.lose.total}</Text>
                                    </View>
                                    <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.goals.for - e.goals.against}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.points}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }else{
                        return(
                            <View key={Math.random()}>
                                <View style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                                    <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '27%',}}>
                                        <Image
                                            style={{width: 28, height: 28}}
                                            resizeMode='contain'
                                            source={{uri: e.team.logo == 'https://media.api-sports.io/rugby/teams/0.png' ? 'https://media.api-sports.io/rugby/teams/100.png' : e.team.logo}}
                                        />
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
                                    </View>
                                    <View style={{width: '9%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.played}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.win.total}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.draw.total}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.lose.total}</Text>
                                    </View>
                                    <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.goals.for - e.goals.against}</Text>
                                    </View>
                                    <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.points}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                })}

                {!isLoading && ordre == 'a' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group A</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                            </View>
                        </View>
                    </View>
                )}
                {!isLoading && ordre == 'a' && aRankings.map((e, index) => {                    
                    return(
                        <View key={Math.random()} style={{flexDirection:'row',backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',height: 45,}}>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.position}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 7, width: '27%',}}>
                                <Image
                                    style={{width: 28, height: 28}}
                                    resizeMode='contain'
                                    source={{uri: e.team.logo}}
                                />
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
                            </View>
                            <View style={{width: '9%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.played}</Text>
                            </View>
                            <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.win.total}</Text>
                            </View>
                            <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.draw.total}</Text>
                            </View>
                            <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.games.lose.total}</Text>
                            </View>
                            <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.goals.for - e.goals.against}</Text>
                            </View>
                            <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.points}</Text>
                            </View>
                        </View>
                    )
                })}

                {!isLoading && ordre == 'b' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group B</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />

                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                            </View>
                        </View>
                    </View>
                )}
                {!isLoading && ordre == 'b' && bRankings.map((e, index) => {
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
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
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

                {!isLoading && ordre == 'c' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group C</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                            </View>
                        </View>
                    </View>
                )}                
                {!isLoading && ordre == 'c' && cRankings.map((e, index) => {
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
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
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

                {!isLoading && ordre == 'd' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group D</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                            </View>
                        </View>
                    </View>
                )}                
                {!isLoading && ordre == 'd' && dRankings.map((e, index) => {                    
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
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
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

                {!isLoading && ordre == 'e' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group E</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                            </View>
                        </View>
                    </View>
                )}
                {!isLoading && ordre == 'e' && eRankings.map((e, index) => {
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
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
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

                {!isLoading && ordre == 'f' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group F</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'J' : 'P'}</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'V' : 'W'}</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'N' : 'D'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>{isFrench ? 'D' : 'L'}</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                            </View>
                        </View>
                    </View>
                )}
                {!isLoading && ordre == 'f' && fRankings.map((e, index) => {
                    
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
                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.team.name}</Text>
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

export default ChampionsCupRankingScreen

const styles = StyleSheet.create({})