import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import moment from 'moment'
import { AntDesign, Feather } from '@expo/vector-icons'
import CalendarStrip from 'react-native-calendar-strip';
import { GlobalContext } from '../contexts/GlobalContext';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const AllCalendarScreen = ({navigation, route}) => {

    const { allCalendarAd, setAllCalendarAd, interstitial, adBannerId, isFrench } = useContext(GlobalContext);
    
    const [listTop14, setListTop14] = useState([])
    const [listProD2, setListProD2] = useState([])
    const [listHCup, setListHCup] = useState([])

    const [listEuro2024, setListEuro2024] = useState([])
    const [listLigue1, setListLigue1] = useState([])
    const [listChampionsLeague, setListChampionsLeague] = useState([])
    const [listPremiereLeague, setListPremiereLeague] = useState([])

    const [listNBA, setListNBA] = useState([])

    const [listFormule1, setListFormule1] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))

    useEffect(() => {
        getMatches(false, moment().format('YYYY-MM-DD'))
    }, [])

    async function getMatches(refresh, date){
        refresh ? setIsRefreshing(true) : setIsLoading(true)

        // TOP14
        fetch("https://v1.rugby.api-sports.io/games?season=2024&league=16&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v1.rugby.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('Top 14');
            console.log(data.response);
            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListTop14([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // HCUP
        fetch("https://v1.rugby.api-sports.io/games?season=2024&league=54&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v1.rugby.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('HCUP');
            console.log(data.response);

            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListHCup([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // PROD2
        fetch("https://v1.rugby.api-sports.io/games?season=2024&league=17&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v1.rugby.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('ProD2');
            console.log(data.response);

            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListProD2([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // EURO2024
        fetch("https://v3.football.api-sports.io/fixtures?season=2024&league=4&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v3.football.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('Euro2024');
            console.log(data.response);

            data.response.sort((a, b) => a.fixture.date > b.fixture.date ? 1 : -1)
            setListEuro2024([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // Ligue1
        fetch("https://v3.football.api-sports.io/fixtures?season=2024&league=61&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v3.football.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('Ligue1');
            console.log(data.response);

            data.response.sort((a, b) => a.fixture.date > b.fixture.date ? 1 : -1)
            setListLigue1([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // Ligue des champions
        fetch("https://v3.football.api-sports.io/fixtures?season=2024&league=2&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v3.football.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('Ligue des champions');
            console.log(data.response);

            data.response.sort((a, b) => a.fixture.date > b.fixture.date ? 1 : -1)
            setListChampionsLeague([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // Premiere league
        fetch("https://v3.football.api-sports.io/fixtures?season=2024&league=39&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v3.football.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('Premiere league');
            console.log(data.response);

            data.response.sort((a, b) => a.fixture.date > b.fixture.date ? 1 : -1)
            setListPremiereLeague([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // NBA
        fetch("https://v1.basketball.api-sports.io/games?season=2024-2025league=12&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v1.basketball.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('NBA');
            console.log(data.response);

            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListNBA([...data.response])
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));

        // Formule 1
        fetch("https://v1.formula-1.api-sports.io/races?season=2024&date="+date, {"method": "GET","headers": {"x-rapidapi-host": "v1.formula-1.api-sports.io","x-rapidapi-key": process.env.API_KEY}})
        .then(response => response.json())
        .then(data => {
            console.log('Formule 1');
            console.log(data.response);

            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListFormule1([...data.response])
            refresh ? setIsRefreshing(false) : setIsLoading(false)
        }).catch(err => refresh ? setIsRefreshing(false) : setIsLoading(false));
    }
    
    const fetchDateMatches = async (date) => {
        try {
            if(allCalendarAd){
                setAllCalendarAd(false)
                interstitial.show();
            }            
        } catch (error) {
            console.log(error);
        }
        setSelectedDate(moment(date).format('YYYY-MM-DD'))

        getMatches(false, moment(date).format('YYYY-MM-DD'))
    }

    const onRefresh = async () => {
        setIsRefreshing(true)
        getMatches(true, moment(selectedDate).format('YYYY-MM-DD'))
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
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width: '80%',}}>
                    <Image
                        style={{width: 50,height: 30,}}
                        resizeMode='contain'
                        source={require('../assets/all_sports_2.webp')}
                    />
                </View>
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
                { isLoading && <ActivityIndicator style={{marginTop: 50,}}/>}

                {!isLoading && listChampionsLeague.length == 0 && listEuro2024.length == 0 && listFormule1.length == 0 && listHCup.length == 0 && listLigue1.length == 0 && listNBA.length == 0 && listPremiereLeague.length == 0 && listProD2.length == 0 && listTop14.length == 0 && (
                    <View style={{marginTop: 10,}}>
                        <Text style={{textAlign: 'center',}}>
                            {isFrench ? 'Aucun évènement aujourd\'hui' : 'No events today'}
                        </Text>
                    </View>
                )}

                {!isLoading && listTop14.length > 0 && (
                    <>
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
                                source={{uri: listTop14[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold',}}>Top 14</Text>
                            <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                                {isFrench && listTop14[0].week == 'Quarter-finals' ? (
                                    <Text style={{}}> - Barrages</Text>
                                ) : isFrench && listTop14[0].week == 'Semi-Finals' ? (
                                    <Text style={{}}> - Demi-Finale</Text>
                                ) : isFrench && listTop14[0].week == 'Final' && listTop14.length == 2 ? (
                                    <Text style={{}}> Promotion / Relégation & Barrages</Text>
                                ) : isFrench && listTop14[0].week == 'Final' && listTop14.length == 1 ? (
                                    <Text style={{}}> - Finale</Text>
                                ) : isFrench ? (
                                    <Text style={{}}> - Journée {listTop14[0].week}</Text>
                                ) : (
                                    <Text style={{}}> - Day {listTop14[0].week}</Text>
                                )}
                            </Text>
                        </View>

                        {listTop14.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
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

                                    {e.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.date).format('HH:mm')}</Text>
                                    )}

                                </View>
                            )
                        })}
                    </>
                )}

                {!isLoading && listHCup.length > 0 && (
                    <>
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
                                source={{uri: listHCup[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold',}}>Champions Cup</Text>
                        </View>

                        {listHCup.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
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

                                    {e.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.date).format('HH:mm')}</Text>
                                    )}

                                </View>
                            )
                        })}
                    </>
                )}

                {/* ProD2 */}
                {!isLoading && listProD2.length > 0 && (
                    <>
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
                                source={{uri: listProD2[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold',}}>ProD2</Text>
                            <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                                {listProD2[0].week == 'Quarter-finals' ? (
                                    <Text style={{}}> - Barrages</Text>
                                ) : listProD2[0].week == 'Semi-finals' ? (
                                    <Text style={{}}> - Demi-Finale</Text>
                                ) : listProD2[0].week == 'Final' && listProD2.length == 2 ? (
                                    <Text style={{}}> Promotion / Relégation & Barrages</Text>
                                ) : listProD2[0].week == 'Final' && listProD2.length == 1 ? (
                                    <Text style={{}}> - Finale</Text>
                                ) : (
                                    <Text style={{}}> - Journée {listProD2[0].week}</Text>
                                )}
                            </Text>
                        </View>
                        {listProD2.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
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

                                    {e.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.date).format('HH:mm')}</Text>
                                    )}
                                    
                                </View>
                            )
                        })}
                    </>
                )}


                {/* Euro2024 */}
                {!isLoading && listEuro2024.length > 0 && (
                    <>
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
                                source={{uri: listEuro2024[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold',}}>Euro 2024</Text>
                        </View>

                        {listEuro2024.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.fixture.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
                                        <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                            <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                            <Image
                                                style={{width: 30, height: 30}}
                                                resizeMode='contain'
                                                source={{uri: e.teams.home.logo}}
                                            />
                                        </View>

                                        {e.fixture.status.long == 'Match Finished' ? (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'flex-start',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
                                                </View>
                                            </View>
                                        ) : e.fixture.status.long == 'Not Started' ? (
                                            <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                            </View>
                                        ) : (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
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

                                    {e.fixture.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                    )}

                                </View>
                            )
                        })}
                    </>
                )}

                {/* Ligue 1 */}
                {!isLoading && listLigue1.length > 0 && (
                    <>
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
                                source={{uri: listLigue1[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold',}}>Ligue 1</Text>
                            <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                                 - {isFrench ? 'Journée' : 'Day'} {listLigue1[0].league.round.slice(-2)}
                            </Text>
                        </View>

                        {listLigue1.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.fixture.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
                                        <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                            <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                            <Image
                                                style={{width: 30, height: 30}}
                                                resizeMode='contain'
                                                source={{uri: e.teams.home.logo}}
                                            />
                                        </View>

                                        {e.fixture.status.long == 'Match Finished' ? (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
                                                </View>
                                            </View>
                                        ) : e.fixture.status.long == 'Not Started' ? (
                                            <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                            </View>
                                        ) : (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
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

                                    {e.fixture.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                    )}

                                </View>
                            )
                        })}
                    </>
                )}

                {/* Ligue des champions */}
                {!isLoading && listChampionsLeague.length > 0 && (
                    <>
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
                                source={{uri: 'https://media.api-sports.io/football/leagues/2.png'}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold',textAlign: 'center',}}>
                                {isFrench ? 'Ligue des Champions' : 'Champion\'s League'}
                            </Text>
                        </View>



                        {listChampionsLeague.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.fixture.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
                                        <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                            <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                            <Image
                                                style={{width: 30, height: 30}}
                                                resizeMode='contain'
                                                source={{uri: e.teams.home.logo}}
                                            />
                                        </View>

                                        {e.fixture.status.long == 'Match Finished' ? (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
                                                </View>
                                            </View>
                                        ) : e.fixture.status.long == 'Not Started' ? (
                                            <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                            </View>
                                        ) : (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
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

                                    {e.fixture.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                    )}
                                </View>
                            )
                        })}
                    </>
                )}

                {/* Premiere League */}
                {!isLoading && listPremiereLeague.length > 0 && (
                    <>
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
                                source={{uri: listPremiereLeague[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold'}}>Premier League</Text>
                            <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                                 - {isFrench ? 'Journée' : 'Day'} {listPremiereLeague[0].league.round.slice(-2)}
                            </Text>
                        </View>

                        {listPremiereLeague.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.fixture.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
                                        <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                            <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                            <Image
                                                style={{width: 30, height: 30}}
                                                resizeMode='contain'
                                                source={{uri: e.teams.home.logo}}
                                            />
                                        </View>

                                        {e.fixture.status.long == 'Match Finished' ? (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
                                                </View>
                                            </View>
                                        ) : e.fixture.status.long == 'Not Started' ? (
                                            <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                            </View>
                                        ) : (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.goals.home}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.goals.away}</Text>
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

                                    {e.fixture.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.fixture.date).format('HH:mm')}</Text>
                                    )}

                                </View>
                            )
                        })}
                    </>
                )}

                {/* NBA */}
                {!isLoading && listNBA.length > 0 && (
                    <>
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
                                source={{uri: listNBA[0].league.logo}}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold'}}>NBA</Text>
                            <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold'}}>
                                {listNBA[0].week}
                            </Text>
                        </View>

                        {listNBA.map(e => {
                            return(
                                <View key={Math.random()} style={{backgroundColor: 'white',marginBottom: 6,paddingTop: 8, paddingBottom: e.status.long !== 'Not Started' ? 0 : 8}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%', backgroundColor: 'white',}}>
                                        <View style={{flexDirection:'row',alignItems:'center',width: '40%',gap: 5,marginRight: 25,justifyContent:'flex-end',}}>
                                            <Text style={{fontWeight: 'bold',textAlign: 'right',}}>{e.teams.home.name.replace(' ', "\n")}</Text>
                                            <Image
                                                style={{width: 30, height: 30}}
                                                resizeMode='contain'
                                                source={{uri: e.teams.home.logo}}
                                            />
                                        </View>

                                        {(e.status.long == 'Game Finished' || e.status.long == 'After Over Time') ? (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.scores.home.total}</Text>
                                                </View>
                                                <View style={{backgroundColor: 'black',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.scores.away.total}</Text>
                                                </View>
                                            </View>
                                        ) : e.status.long == 'Not Started' ? (
                                            <View style={{backgroundColor: '#E6E6E6',justifyContent:'center',alignItems:'center',width: '18%',marginHorizontal: -20, height: 40}}>
                                                <Text style={{fontSize: 14,fontWeight: 'bold',}}>{moment(e.date).format('HH:mm')}</Text>
                                            </View>
                                        ) : (
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap: 3, width: '10%'}}>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white', fontWeight: 'bold',fontSize: 13,}}>{e.scores.home.total}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#E20054',width: 35, height: 50,justifyContent:'center',alignItems:'center',}}>
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize: 13,}}>{e.scores.away.total}</Text>
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

                                    {e.status.long !== 'Not Started' && (
                                        <Text style={{fontSize: 12,textAlign: 'center',color:'#a8a8a8'}}>{moment(e.date).format('HH:mm')}</Text>
                                    )}

                                </View>
                            )
                        })}
                    </>
                )}

                {/* Formule 1 */}
                {!isLoading && listFormule1.length > 0 && (
                    <>
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
                                style={{width: 50,height: 30,marginLeft: 5,borderRadius: 10,}}
                                resizeMode='contain'
                                source={require('../assets/F1-logo.png')}
                            />
                            <Text style={{fontSize: 15,fontWeight: 'bold'}}>{isFrench ? 'Formule 1' : 'Formula 1'}</Text>
                        </View>

                        {listFormule1.map(e => {
                            return(
                                <View key={Math.random()} style={{marginBottom: 6,width:'100%', backgroundColor: 'white',paddingTop: 8}}>
                                    <View style={{flexDirection:'row',width: '100%',gap: 5,marginLeft: 10,}}>
                                        <Image
                                            style={{width: 30, height: 30}}
                                            resizeMode='contain'
                                            source={{uri: e.circuit.image}}
                                        />
                                        <View style={{marginTop: 3,marginLeft: 5,}}>
                                            <Text style={{fontWeight: 'bold',textAlign: 'right',color:'#999999'}}>{e.circuit.name}</Text>
                                            <Text style={{fontWeight: 'bold',fontSize: 16,marginVertical: 3,marginBottom: 6,}}>{e.type}</Text>
                                        </View>
                                    </View>

                                    {e.status == 'Completed' ? (
                                        <View style={{flexDirection:'row',justifyContent:'flex-end',width: '100%',paddingRight: 10,backgroundColor: '#f0f0f0',paddingVertical: 5}}>
                                            <Text style={{fontWeight: 'bold',color:'#333'}}>{e.status}</Text>
                                        </View>
                                    ) : (
                                        <View style={{flexDirection:'row',justifyContent:'flex-end',width: '100%',paddingRight: 10,backgroundColor: '#f0f0f0',paddingVertical: 5}}>
                                            <Text style={{fontWeight: 'bold',color:'#333'}}>
                                                {e.status} at {moment(e.date).format('HH:mm')}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )
                        })}
                    </>
                )}



                <View style={{height: 50}}/>
            </ScrollView>

            <BannerAd
                unitId={adBannerId} 
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />

        </View>
    )
}

export default AllCalendarScreen

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