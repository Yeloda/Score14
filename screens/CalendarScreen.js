import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import moment from 'moment'
import { AntDesign, Feather } from '@expo/vector-icons'
import CalendarStrip from 'react-native-calendar-strip';
import { GlobalContext } from '../contexts/GlobalContext';

const MapScreen = ({navigation, route}) => {

    const { firstAd, setFirstAd, interstitial } = useContext(GlobalContext);
    
    const [listMatches, setListMatches] = useState([])
    const [listMatchesChampion, setListMatchesChampion] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))

    useEffect(() => {
        getMatches()

        async function getMatches(){
            setIsLoading(true)
            const today = moment().format('YYYY-MM-DD')

            fetch("https://v1.rugby.api-sports.io/games?season=2023&league=16&date="+today, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.rugby.api-sports.io",
                    "x-rapidapi-key": process.env.API_KEY
                }
            })
            .then(response => response.json())
            .then(data => {
                setListMatches([...data.response])
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false)
            });

            fetch("https://v1.rugby.api-sports.io/games?season=2023&league=54&date="+today, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.rugby.api-sports.io",
                    "x-rapidapi-key": process.env.API_KEY
                }
            })
            .then(response => response.json())
            .then(data => {
                setListMatchesChampion([...data.response])
                setIsLoading(false)
            })
            .catch(err => {
                alert(JSON.stringify(err))
                console.log(err);
                setIsLoading(false)
            });
        }
    }, [])
    
    const fetchDateMatches = async (date) => {
        if(firstAd){
            setFirstAd(false)
            interstitial.show();
        }
        setSelectedDate(date)
        const searchDate = moment(date).format('YYYY-MM-DD')

        fetch("https://v1.rugby.api-sports.io/games?season=2023&league=16&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setListMatches([...data.response])
        })
        .catch(err => {
            console.log(err);
        });

        fetch("https://v1.rugby.api-sports.io/games?season=2023&league=54&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setListMatchesChampion([...data.response])
            setIsLoading(false)
        })
        .catch(err => {
            alert(JSON.stringify(err))

            console.log(err);
            setIsLoading(false)
        });
    }

    const onRefresh = async () => {
        setIsRefreshing(true)
        const searchDate = moment(selectedDate).format('YYYY-MM-DD')

        fetch("https://v1.rugby.api-sports.io/games?season=2023&league=16&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setListMatches([...data.response])
            setIsRefreshing(false)
        })
        .catch(err => {
            console.log(err);
            setIsRefreshing(false)
        });


        fetch("https://v1.rugby.api-sports.io/games?season=2023&league=54&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setListMatchesChampion([...data.response])
            setIsRefreshing(false)
        })
        .catch(err => {
            console.log(err);
            setIsRefreshing(false)
        });
    }


    return (
        <View style={{flex: 1, backgroundColor: '#E6E6E6',}}>
            <View style={{flexDirection:'row',backgroundColor: '#333333',height: 90,alignItems:'flex-end',paddingBottom: 15}}>
                <TouchableOpacity 
                    style={{width: '11%',alignItems:'center',justifyContent:'center',paddingLeft: 20}}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Feather name="menu" size={24} color='white' />
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '23%',}}/>
                <View style={{width: '10%',justifyContent:'center',alignItems:'center',}}/>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}/>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}/>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}/>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}/>
                <View style={{width: '11%',justifyContent:'center',alignItems:'center',}}/>
            </View>

            <CalendarStrip
                scrollable
                style={{height:80, paddingTop: 10,}}
                calendarColor={'#3343CE'}
                calendarHeaderStyle={{color: 'white'}}
                iconContainer={{flex: 0.1}}
                selectedDate={moment()}
                startingDate={moment().subtract(3,'days')}
                onDateSelected={date => fetchDateMatches(date)}
                leftSelector={<AntDesign name="left" size={16} color="white" />}
                rightSelector={<AntDesign name="right" size={16} color="white" />}
                dateNameStyle={{color:'white',fontWeight: 'bold',fontSize: 8,}}
                dateNumberStyle={{color:'white',fontWeight: 'bold',fontSize: 8,}}
                highlightDateNameStyle={{color:'#61ff61',fontWeight: 'bold',fontSize: 13,}}
                highlightDateNumberStyle={{color:'#61ff61',fontWeight: 'bold',fontSize: 13,}}
            />

            <ScrollView 
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            >
                { isLoading ? (
                    <ActivityIndicator style={{marginTop: 50,}}/>
                ) : (listMatches.length == 0 && listMatchesChampion.length == 0) ? (
                    <View style={{marginTop: 10,}}>
                        <Text style={{textAlign: 'center',}}>Aucun match aujourd'hui</Text>
                    </View>
                ) : (
                    <>
                        {listMatches.length > 0 && (
                            <View 
                                style={[
                                    styles.elevate, 
                                    {
                                        height: 40,
                                        flexDirection:'row',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        alignSelf:'center',
                                        gap: 5,
                                        backgroundColor: '#d9d9d9',
                                        borderWidth:1,
                                        borderColor:'#808080',
                                        marginVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 10,
                                    }
                                ]}
                            >
                                <Image
                                    style={{width: 30, height: 30, borderRadius: 3,}}
                                    resizeMode='contain'
                                    source={{uri: listMatches[0].league.logo}}
                                />
                                <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                                    - {moment(listMatches[0].date).format('dddd LL')} - Journée {listMatches[0].week}
                                </Text>
                            </View>
                        )}
                        {listMatches.map(e => {
                            return(
                                <View key={Math.random()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom: 6,width:'100%', backgroundColor: 'white',paddingVertical: 8}}>
                                    <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                        <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                        <Image
                                            style={{width: 30, height: 30}}
                                            resizeMode='contain'
                                            source={{uri: e.teams.home.logo}}
                                        />
                                    </View>

                                    {e.status.long == 'Finished' ? (
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                            <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.scores.home}</Text>
                                            </View>
                                            <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.scores.away}</Text>
                                            </View>
                                        </View>
                                    ) : e.status.long == 'Not Started' ? (
                                        <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                            <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.date).format('HH:mm')}</Text>
                                        </View>
                                    ) : (
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                            <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.scores.home}</Text>
                                            </View>
                                            <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.scores.away}</Text>
                                            </View>
                                        </View>
                                    )}

                                    <View style={{flexDirection:'row',alignItems:'center',width:'40%',gap: 5, marginLeft: 25}}>
                                        <Image
                                            style={{width: 30, height: 30}}
                                            resizeMode='contain'
                                            source={{uri: e.teams.away.logo}}
                                        />
                                        <Text style={{fontWeight: 'bold',textAlign: 'left',}}>{e.teams.away.name.replace(' ', "\n")}</Text>
                                    </View>
                                </View>
                            )
                        })}

                        {listMatchesChampion.length > 0 && (
                            <View 
                                style={[
                                    styles.elevate, 
                                    {
                                        height: 40,
                                        flexDirection:'row',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        alignSelf:'center',
                                        gap: 5,
                                        backgroundColor: '#d9d9d9',
                                        borderWidth:1,
                                        borderColor:'#808080',
                                        marginVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 10,
                                    }
                                ]}
                            >
                                <Image
                                    style={{width: 30, height: 30, borderRadius: 3,}}
                                    resizeMode='contain'
                                    source={{uri: listMatchesChampion[0].league.logo}}
                                />
                                <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                                    - {moment(listMatchesChampion[0].date).format('dddd LL')}
                                </Text>
                            </View>
                        )}
                        {listMatchesChampion.map(e => {
                            return(
                                <View key={Math.random()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom: 6,width:'100%', backgroundColor: 'white',paddingVertical: 8}}>
                                    <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                        <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                        <Image
                                            style={{width: 30, height: 30}}
                                            resizeMode='contain'
                                            source={{uri: e.teams.home.logo}}
                                        />
                                    </View>

                                    {(e.status.long == 'Finished' || e.status.long == 'After Extra Time') ? (
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                            <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.scores.home}</Text>
                                            </View>
                                            <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.scores.away}</Text>
                                            </View>
                                        </View>
                                    ) : e.status.long == 'Not Started' ? (
                                        <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                            <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.date).format('HH:mm')}</Text>
                                        </View>
                                    ) : (
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                            <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.scores.home}</Text>
                                            </View>
                                            <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.scores.away}</Text>
                                            </View>
                                        </View>
                                    )}

                                    <View style={{flexDirection:'row',alignItems:'center',width:'40%',gap: 5, marginLeft: 25}}>
                                        <Image
                                            style={{width: 30, height: 30}}
                                            resizeMode='contain'
                                            source={{uri: e.teams.away.logo}}
                                        />
                                        <Text style={{fontWeight: 'bold',textAlign: 'left',}}>{e.teams.away.name.replace(' ', "\n")}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </>
                )
            }

                <View style={{height: 50}}/>
            </ScrollView>

        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    elevate: {
        elevation: 10,
        shadowRadius: 8,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
})