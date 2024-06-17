import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import moment from 'moment'
import { AntDesign, Feather } from '@expo/vector-icons'
import CalendarStrip from 'react-native-calendar-strip';
import { GlobalContext } from '../../contexts/GlobalContext';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const Formule1CalendarScreen = ({navigation, route}) => {

    const { firstFormule1Ad, setFirstFormule1Ad, interstitial, adBannerId } = useContext(GlobalContext);
    
    const [listMatches, setListMatches] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))

    useEffect(() => {
        getMatches()

        async function getMatches(){
            setIsLoading(true)
            const today = moment().format('YYYY-MM-DD')

            fetch("https://v1.formula-1.api-sports.io/races?season=2024&date="+today, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.formula-1.api-sports.io",
                    "x-rapidapi-key": process.env.API_KEY
                }
            })
            .then(response => response.json())
            .then(data => {
                data.response.sort((a, b) => a.date > b.date ? 1 : -1)
                setListMatches([...data.response])
                setIsLoading(false)
            }).catch(err => {
                console.log(err);
                setIsLoading(false)
            });
        }
    }, [])
    
    const fetchDateMatches = async (date) => {
        if(firstFormule1Ad){
            setFirstFormule1Ad(false)
            interstitial.show();
        }
        setSelectedDate(date)
        const searchDate = moment(date).format('YYYY-MM-DD')

        fetch("https://v1.formula-1.api-sports.io/races?season=2024&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListMatches([...data.response])
        }).catch(err => {
            console.log(err);
        });
    }

    const onRefresh = async () => {
        setIsRefreshing(true)
        const searchDate = moment(selectedDate).format('YYYY-MM-DD')

        fetch("https://v1.formula-1.api-sports.io/races?season=2024&date="+searchDate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            data.response.sort((a, b) => a.date > b.date ? 1 : -1)
            setListMatches([...data.response])
            setIsRefreshing(false)
        }).catch(err => {
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
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap: 3, width: '23%',}} />
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
                ) : listMatches.length == 0 ? (
                    <View style={{marginTop: 10,}}>
                        <Text style={{textAlign: 'center',}}>Aucune course aujourd'hui</Text>
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
                                <Text style={{textAlign: 'center',fontSize: 15,fontWeight: 'bold'}}>
                                    {moment(listMatches[0].date).format('dddd LL')}
                                </Text>
                            </View>
                        )}

                        {listMatches.map(e => {
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
                )
            }

                <View style={{height: 50}}/>
            </ScrollView>

            <BannerAd
                unitId={adBannerId} 
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
        </View>
    )
}

export default Formule1CalendarScreen

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