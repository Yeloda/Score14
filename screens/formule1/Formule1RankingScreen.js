import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AntDesign, Feather } from '@expo/vector-icons'
import SwitchSelector from "react-native-switch-selector";

import { GlobalContext } from '../../contexts/GlobalContext'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const { width, height } = Dimensions.get('window')

const Formule1RankingScreen = ({navigation, route}) => {

    const { isLoading, setIsLoading, adBannerId } = useContext(GlobalContext);

    const [rankingsPilotes, setRankingsPilotes] = useState([])
    const [rankingsConstructeurs, setRankingsConstructeurs] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [ordre, setOrdre] = useState('pilotes')


    useEffect(() => {
        getRanks(false)
    }, [])

    const onRefresh = async () => {
        getRanks(true)
    }

    async function getRanks(doRefresh){

        doRefresh ? setIsRefreshing(true) : setIsLoading(true)

        // PILOTES
        fetch("https://v1.formula-1.api-sports.io/rankings/drivers?season=2023", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setRankingsPilotes([...data.response])
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        }).catch(err => {
            alert('Une erreur s\'est produite pendant le chargement')
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        });

        // CONSTRUCTEURS
        fetch("https://v1.formula-1.api-sports.io/rankings/teams?season=2023", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": process.env.API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setRankingsConstructeurs([...data.response])
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        }).catch(err => {
            alert('Une erreur s\'est produite pendant le chargement')
            doRefresh ? setIsRefreshing(false) : setIsLoading(false)
        });
    }

    return (
        <View style={{flex: 1}}>
            <View key={Math.random()} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', backgroundColor: '#333333',height: 90,alignItems:'flex-end',paddingBottom: 15}}>
                <TouchableOpacity 
                    style={{width: '14%',alignItems:'center',justifyContent:'center',paddingLeft: 20}}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Feather name="menu" size={24} color='white' />
                </TouchableOpacity>

                <Image
                    style={{width: 50,height: 30,marginLeft: 5,borderRadius: 10,}}
                    resizeMode='contain'
                    source={require('../../assets/F1-logo.png')}
                />

                <View style={{width: '14%',justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white',fontSize: 12,fontWeight: 'bold',}}>Pts</Text>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator style={{marginTop: 100,}} />
            ) : (
                <View style={{backgroundColor: '#cfcfcf',padding: 15}}>

                    <SwitchSelector
                        initial={0}
                        options={[{label:'Pilotes',value:'pilotes'},{label:'Constructeurs',value:'constructeurs'}]}
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
                {!isLoading && ordre == 'pilotes' && rankingsPilotes.map((e, index) => {
                    return(
                        <View key={Math.random()} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',paddingVertical: 5, marginBottom: e.team.name.includes('Scuderia Ferrari') ? -20 : 0,}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',marginHorizontal: 15,}}>{e.position}</Text>

                                <View>
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                                        <Image
                                            style={{width: 28, height: 28}}
                                            resizeMode='contain'
                                            source={{uri: e.driver.image}}
                                        />
                                        <Text style={{fontSize: 14,fontWeight: 'bold',marginLeft: 5}}>{e.driver.name}</Text>
                                    </View>
                                    <Text style={{marginLeft: 5,color:'#919191'}}>{e.team.name.replace('Visa Cash App', '')}</Text>
                                </View>
                            </View>

                            <Text style={{fontSize: 14,fontWeight: 'bold',marginHorizontal: 15,marginTop: e.team.name.includes('Scuderia Ferrari') ? -17 : 0,}}>{e.points ?? 0}</Text>
                        </View>
                    )
                })}

                {!isLoading && ordre == 'constructeurs' && rankingsConstructeurs.map((e, index) => {
                    return(
                        <View key={Math.random()} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', backgroundColor: index % 2 == 0 ? 'white' : '#f0f0f0',paddingVertical: 5, marginBottom: e.team.name.includes('Scuderia Ferrari') ? -20 : 0,}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                                <Text style={{fontSize: 14,fontWeight: 'bold',marginHorizontal: 15,marginTop: e.team.name.includes('Scuderia Ferrari') ? -18 : 0,}}>{e.position}</Text>

                                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                                    <Image
                                        style={{width: 50, height: 60, marginTop: e.team.name.includes('Scuderia Ferrari') ? -5 : 0,marginBottom: e.team.name.includes('Scuderia Ferrari') ? 10 : 0,}}
                                        resizeMode='contain'
                                        source={{uri: e.team.logo}}
                                    />
                                    <Text style={{fontSize: 14,fontWeight: 'bold',marginLeft: 5}}>{e.team.name.replace('Visa Cash App', '')}</Text>
                                </View>
                            </View>

                            <Text style={{fontSize: 14,fontWeight: 'bold',marginHorizontal: 15,marginTop: e.team.name.includes('Scuderia Ferrari') ? -17 : 0,}}>{e.points ?? 0}</Text>
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

export default Formule1RankingScreen

const styles = StyleSheet.create({})