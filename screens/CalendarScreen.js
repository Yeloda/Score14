import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import moment from 'moment'
import { AntDesign, Feather } from '@expo/vector-icons'
import CalendarStrip from 'react-native-calendar-strip';

const MapScreen = ({navigation, route}) => {

    const [listMatches, setListMatches] = useState([{"id":41357,"date":"2024-05-11T13:00:00+00:00","time":"13:00","timestamp":1715432400,"timezone":"UTC","week":"23","status":{"long":"Finished","short":"FT"},"country":{"id":7,"name":"France","code":"FR","flag":"https://media.api-sports.io/flags/fr.svg"},"league":{"id":16,"name":"Top 14","type":"League","logo":"https://media.api-sports.io/rugby/leagues/16.png","season":2023},"teams":{"home":{"id":120,"name":"USA Perpignan","logo":"https://media.api-sports.io/rugby/teams/120.png"},"away":{"id":99,"name":"Clermont","logo":"https://media.api-sports.io/rugby/teams/99.png"}},"scores":{"home":28,"away":35},"periods":{"first":{"home":10,"away":3},"second":{"home":18,"away":32},"overtime":{"home":null,"away":null},"second_overtime":{"home":null,"away":null}}},{"id":41356,"date":"2024-05-11T15:00:00+00:00","time":"15:00","timestamp":1715439600,"timezone":"UTC","week":"23","status":{"long":"Finished","short":"FT"},"country":{"id":7,"name":"France","code":"FR","flag":"https://media.api-sports.io/flags/fr.svg"},"league":{"id":16,"name":"Top 14","type":"League","logo":"https://media.api-sports.io/rugby/leagues/16.png","season":2023},"teams":{"home":{"id":105,"name":"Section Paloise","logo":"https://media.api-sports.io/rugby/teams/105.png"},"away":{"id":731,"name":"US Oyonnax","logo":"https://media.api-sports.io/rugby/teams/731.png"}},"scores":{"home":39,"away":17},"periods":{"first":{"home":19,"away":10},"second":{"home":20,"away":7},"overtime":{"home":null,"away":null},"second_overtime":{"home":null,"away":null}}},{"id":41359,"date":"2024-05-11T15:00:00+00:00","time":"15:00","timestamp":1715439600,"timezone":"UTC","week":"23","status":{"long":"Finished","short":"FT"},"country":{"id":7,"name":"France","code":"FR","flag":"https://media.api-sports.io/flags/fr.svg"},"league":{"id":16,"name":"Top 14","type":"League","logo":"https://media.api-sports.io/rugby/leagues/16.png","season":2023},"teams":{"home":{"id":103,"name":"RC Toulonnais","logo":"https://media.api-sports.io/rugby/teams/103.png"},"away":{"id":101,"name":"Lyon","logo":"https://media.api-sports.io/rugby/teams/101.png"}},"scores":{"home":30,"away":24},"periods":{"first":{"home":13,"away":3},"second":{"home":17,"away":21},"overtime":{"home":null,"away":null},"second_overtime":{"home":null,"away":null}}},{"id":41360,"date":"2024-05-11T15:00:00+00:00","time":"15:00","timestamp":1715439600,"timezone":"UTC","week":"23","status":{"long":"Finished","short":"FT"},"country":{"id":7,"name":"France","code":"FR","flag":"https://media.api-sports.io/flags/fr.svg"},"league":{"id":16,"name":"Top 14","type":"League","logo":"https://media.api-sports.io/rugby/leagues/16.png","season":2023},"teams":{"home":{"id":98,"name":"Castres Olympique","logo":"https://media.api-sports.io/rugby/teams/98.png"},"away":{"id":102,"name":"Montpellier","logo":"https://media.api-sports.io/rugby/teams/102.png"}},"scores":{"home":27,"away":26},"periods":{"first":{"home":13,"away":16},"second":{"home":14,"away":10},"overtime":{"home":null,"away":null},"second_overtime":{"home":null,"away":null}}},{"id":41362,"date":"2024-05-11T15:00:00+00:00","time":"15:00","timestamp":1715439600,"timezone":"UTC","week":"23","status":{"long":"Finished","short":"FT"},"country":{"id":7,"name":"France","code":"FR","flag":"https://media.api-sports.io/flags/fr.svg"},"league":{"id":16,"name":"Top 14","type":"League","logo":"https://media.api-sports.io/rugby/leagues/16.png","season":2023},"teams":{"home":{"id":104,"name":"Racing 92","logo":"https://media.api-sports.io/rugby/teams/104.png"},"away":{"id":95,"name":"Aviron Bayonnais","logo":"https://media.api-sports.io/rugby/teams/95.png"}},"scores":{"home":28,"away":37},"periods":{"first":{"home":21,"away":28},"second":{"home":7,"away":9},"overtime":{"home":null,"away":null},"second_overtime":{"home":null,"away":null}}},{"id":41361,"date":"2024-05-11T19:05:00+00:00","time":"19:05","timestamp":1715454300,"timezone":"UTC","week":"23","status":{"long":"Finished","short":"FT"},"country":{"id":7,"name":"France","code":"FR","flag":"https://media.api-sports.io/flags/fr.svg"},"league":{"id":16,"name":"Top 14","type":"League","logo":"https://media.api-sports.io/rugby/leagues/16.png","season":2023},"teams":{"home":{"id":96,"name":"Bordeaux Begles","logo":"https://media.api-sports.io/rugby/teams/96.png"},"away":{"id":100,"name":"Stade Rochelais","logo":"https://media.api-sports.io/rugby/teams/100.png"}},"scores":{"home":34,"away":14},"periods":{"first":{"home":19,"away":7},"second":{"home":15,"away":7},"overtime":{"home":null,"away":null},"second_overtime":{"home":null,"away":null}}}])


    // useEffect(() => {
    //     getMatches()

    //     async function getMatches(){
    //         const today = moment().format('YYYY-MM-DD')
    //         const twodays = moment().subtract(2, 'days').format('YYYY-MM-DD')
    //         const threedays = moment().subtract(3, 'days').format('YYYY-MM-DD')

    //         fetch("https://v1.rugby.api-sports.io/games?season=2023&league=16&date="+threedays, {
    //             "method": "GET",
    //             "headers": {
    //                 "x-rapidapi-host": "v1.rugby.api-sports.io",
    //                 "x-rapidapi-key": "a23ab0288fb5533c2359b3ffe6a416a9"
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(JSON.stringify(data.response));
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     }

    // }, [])
    
    const fetchDateMatches = async (date) => {
        const searchDate = moment(date).format('YYYY-MM-DD')

        fetch("https://v1.rugby.api-sports.io/games?season=2023&league=16&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.rugby.api-sports.io",
                "x-rapidapi-key": "a23ab0288fb5533c2359b3ffe6a416a9"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(JSON.stringify(data.response));
            setListMatches([...data.response])
        })
        .catch(err => {
            console.log(err);
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

            {listMatches.length > 0 && (
                <View style={[styles.elevate, {borderWidth:1, borderColor:'#808080', backgroundColor: '#d9d9d9',alignItems:'center',justifyContent:'center',height: 40,paddingHorizontal: 20, borderRadius: 10,alignSelf:'center',marginTop: 10,}]}>
                    <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold', textTransform: 'capitalize'}}>
                        {moment(listMatches[0].date).format('dddd LL')} - Journée {listMatches[0].week}
                    </Text>
                </View>
            )}

            <ScrollView style={{marginTop: 10,}}>
                {listMatches.length == 0 ? (
                    <View style={{}}>
                        <Text style={{textAlign: 'center',}}>Aucun match aujourd'hui</Text>
                    </View>
                ) : listMatches.map(e => {
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
                                    <Text style={{fontSize: 14,fontWeight: 'bold',}}>{e.time}</Text>
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