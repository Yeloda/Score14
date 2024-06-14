import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { GlobalContext } from '../../contexts/GlobalContext'

import { Feather } from '@expo/vector-icons'
import SwitchSelector from "react-native-switch-selector";
import { useFocusEffect } from '@react-navigation/native'


const { width, height } = Dimensions.get('window')

const EuroRankingScreen = ({navigation, route}) => {

    const { firstPressFootball, setFirstPressFootball, isLoading, setIsLoading } = useContext(GlobalContext);

    const [tousRankings, setTousRankings] = useState([])
    const [aRankings, setARankings] = useState([])
    const [bRankings, setBRankings] = useState([])
    const [cRankings, setCRankings] = useState([])
    const [dRankings, setDRankings] = useState([])
    const [eRankings, setERankings] = useState([])
    const [fRankings, setFRankings] = useState([])



    const [isRefreshing, setIsRefreshing] = useState(false)

    const [ordre, setOrdre] = useState('tout')

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

        fetch("https://v3.football.api-sports.io/standings?league=4&season=2024", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setTousRankings([...data.response[0].league.standings])
            setARankings([...data.response[0].league.standings[0]])
            setBRankings([...data.response[0].league.standings[1]])
            setCRankings([...data.response[0].league.standings[2]])
            setDRankings([...data.response[0].league.standings[3]])
            setERankings([...data.response[0].league.standings[4]])
            setFRankings([...data.response[0].league.standings[5]])

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
                        options={[{label:'Tout',value:'tout'},{label:'A',value:'a'},{label:'B',value:'b'},{label:'C',value:'c'},{label:'D',value:'d'},{label:'E',value:'e'},{label:'F',value:'f'}]}
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
                {!isLoading && ordre == 'tout' && tousRankings.map((elt, index) => {

                    return(
                        <View key={Math.random()}>

                            {elt[0].group == 'Ranking of third-placed teams' ? (
                                <View style={{backgroundColor: '#cfcfcf',padding: 15,marginTop: 20,}}>
                                    <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Classement des Meilleurs Troisième</Text>
                                </View>
                            ) : (
                                <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                                    {/* <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>{elt[0].group}</Text> */}
                                    {elt[0].group != 'Ranking of third-placed teams' && (
                                        <View key={Math.random()} style={{flexDirection:'row',alignItems:'flex-end',}}>

                                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>{elt[0].group}</Text>
                                            </View>

                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '6%'}} />

                                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                                            </View>
                                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                                            </View>
                                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                                            </View>
                                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
                                            </View>
                                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>+/-</Text>
                                            </View>
                                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>PTS</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}



                            <ScrollView>
                                {elt.map((e, index) => {
                                    let teamName = ''
                                    switch (e.team.name) {
                                        case "Germany":
                                            teamName = "ALL"
                                            break;
                                        case "Scotland":
                                            teamName = "ECO"
                                            break;
                                        case "Switzerland":
                                            teamName = "SUI"
                                            break;
                                        case "Hungary":
                                            teamName = "HON"
                                            break;

                                        case "Italy":
                                            teamName = "ITA"
                                            break;
                                        case "Croatia":
                                            teamName = "CRO"
                                            break;
                                        case "Spain":
                                            teamName = "ESP"
                                            break;
                                        case "Albania":
                                            teamName = "ALB"
                                            break;

                                        case "Slovenia":
                                            teamName = "SVN"
                                            break;
                                        case "Denmark":
                                            teamName = "DAN"
                                            break;
                                        case "England":
                                            teamName = "ANG"
                                            break;
                                        case "Serbia":
                                            teamName = "SRB"
                                            break;

                                        case "Poland":
                                            teamName = "POL"
                                            break;
                                        case "Austria":
                                            teamName = "AUT"
                                            break;
                                        case "France":
                                            teamName = "FRA"
                                            break;
                                        case "Netherlands":
                                            teamName = "NED"
                                            break;

                                        case "Romania":
                                            teamName = "ROU"
                                            break;
                                        case "Belgium":
                                            teamName = "BEL"
                                            break;
                                        case "Slovakia":
                                            teamName = "SVK"
                                            break;
                                        case "Ukraine":
                                            teamName = "UKR"
                                            break;

                                        case "Czech Republic":
                                            teamName = "CZE"
                                            break;
                                        case "Turkey":
                                            teamName = "TUR"
                                            break;
                                        case "Portugal":
                                            teamName = "POR"
                                            break;
                                        case "Georgia":
                                            teamName = "GEO"
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
                            </ScrollView>
                        </View>

                    )
                })}

                {!isLoading && ordre == 'a' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group A</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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

                    let teamName = ''
                    switch (e.team.name) {
                        case "Germany":
                            teamName = "ALL"
                            break;
                        case "Scotland":
                            teamName = "ECO"
                            break;
                        case "Switzerland":
                            teamName = "SUI"
                            break;
                        case "Hungary":
                            teamName = "HON"
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

                {!isLoading && ordre == 'b' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group B</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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

                    let teamName = ''
                    switch (e.team.name) {
                        case "Italy":
                            teamName = "ITA"
                            break;
                        case "Croatia":
                            teamName = "CRO"
                            break;
                        case "Spain":
                            teamName = "ESP"
                            break;
                        case "Albania":
                            teamName = "ALB"
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

                {!isLoading && ordre == 'c' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group C</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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

                    let teamName = ''
                    switch (e.team.name) {
                        case "Slovenia":
                            teamName = "SVN"
                            break;
                        case "Denmark":
                            teamName = "DAN"
                            break;
                        case "England":
                            teamName = "ANG"
                            break;
                        case "Serbia":
                            teamName = "SRB"
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

                {!isLoading && ordre == 'd' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group D</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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

                    let teamName = ''
                    switch (e.team.name) {
                        case "Poland":
                            teamName = "POL"
                            break;
                        case "Austria":
                            teamName = "AUT"
                            break;
                        case "France":
                            teamName = "FRA"
                            break;
                        case "Netherlands":
                            teamName = "NED"
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

                {!isLoading && ordre == 'e' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group E</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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

                    let teamName = ''
                    switch (e.team.name) {
                        case "Romania":
                            teamName = "ROU"
                            break;
                        case "Belgium":
                            teamName = "BEL"
                            break;
                        case "Slovakia":
                            teamName = "SVK"
                            break;
                        case "Ukraine":
                            teamName = "UKR"
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

                {!isLoading && ordre == 'f' && (
                    <View style={{backgroundColor: '#cfcfcf',padding: 15, flexDirection:'row',marginTop: 10,}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end',}}>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3,width: '25%'}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>Group F</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '6%',}} />


                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>J</Text>
                            </View>
                            <View style={{width: '11.2%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>V</Text>
                            </View>
                            <View style={{width: '12%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>N</Text>
                            </View>
                            <View style={{width: '11.7%',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'black',fontSize: 12,fontWeight: 'bold',}}>D</Text>
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

                    let teamName = ''
                    switch (e.team.name) {
                        case "Czech Republic":
                            teamName = "CZE"
                            break;
                        case "Turkey":
                            teamName = "TUR"
                            break;
                        case "Portugal":
                            teamName = "POR"
                            break;
                        case "Georgia":
                            teamName = "GEO"
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

export default EuroRankingScreen

const styles = StyleSheet.create({})