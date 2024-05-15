import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const RankingScreen = ({navigation, route}) => {

    // const [rankings, setRankings] = useState([{"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WWLWL", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "34.78", "total": 8}, "played": 23, "win": {"percentage": "65.22", "total": 15}}, "goals": {"against": 499, "for": 677}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 70, "position": 1, "stage": "Top 14", "team": {"id": 107, "logo": "https://media.api-sports.io/rugby/teams/107.png", "name": "Stade Toulousain"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "LLWWW", "games": {"draw": {"percentage": "4.35", "total": 1}, "lose": {"percentage": "30.43", "total": 7}, "played": 23, "win": {"percentage": "65.22", "total": 15}}, "goals": {"against": 446, "for": 476}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 67, "position": 2, "stage": "Top 14", "team": {"id": 106, "logo": "https://media.api-sports.io/rugby/teams/106.png", "name": "Stade Francais Paris"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WWWLW", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "39.13", "total": 9}, "played": 23, "win": {"percentage": "60.87", "total": 14}}, "goals": {"against": 492, "for": 589}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 63, "position": 3, "stage": "Top 14", "team": {"id": 96, "logo": "https://media.api-sports.io/rugby/teams/96.png", "name": "Bordeaux Begles"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WLWWW", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "43.48", "total": 10}, "played": 23, "win": {"percentage": "56.52", "total": 13}}, "goals": {"against": 469, "for": 605}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 59, "position": 4, "stage": "Top 14", "team": {"id": 103, "logo": "https://media.api-sports.io/rugby/teams/103.png", "name": "RC Toulonnais"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "LLWWW", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "47.83", "total": 11}, "played": 23, "win": {"percentage": "52.17", "total": 12}}, "goals": {"against": 487, "for": 565}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 57, "position": 5, "stage": "Top 14", "team": {"id": 104, "logo": "https://media.api-sports.io/rugby/teams/104.png", "name": "Racing 92"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "LWLWL", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "52.17", "total": 12}, "played": 23, "win": {"percentage": "47.83", "total": 11}}, "goals": {"against": 423, "for": 515}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 56, "position": 6, "stage": "Top 14", "team": {"id": 0, "logo": "https://media.api-sports.io/rugby/teams/100.png", "name": "Stade Rochelais"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WLWLL", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "47.83", "total": 11}, "played": 23, "win": {"percentage": "52.17", "total": 12}}, "goals": {"against": 536, "for": 556}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 55, "position": 7, "stage": "Top 14", "team": {"id": 105, "logo": "https://media.api-sports.io/rugby/teams/105.png", "name": "Section Paloise"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WLWLL", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "52.17", "total": 12}, "played": 23, "win": {"percentage": "47.83", "total": 11}}, "goals": {"against": 571, "for": 568}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 54, "position": 8, "stage": "Top 14", "team": {"id": 98, "logo": "https://media.api-sports.io/rugby/teams/98.png", "name": "Castres Olympique"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "LWWWW", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "47.83", "total": 11}, "played": 23, "win": {"percentage": "52.17", "total": 12}}, "goals": {"against": 612, "for": 553}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 53, "position": 9, "stage": "Top 14", "team": {"id": 120, "logo": "https://media.api-sports.io/rugby/teams/120.png", "name": "USA Perpignan"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WWLLW", "games": {"draw": {"percentage": "8.70", "total": 2}, "lose": {"percentage": "47.83", "total": 11}, "played": 23, "win": {"percentage": "43.48", "total": 10}}, "goals": {"against": 584, "for": 523}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 51, "position": 10, "stage": "Top 14", "team": {"id": 99, "logo": "https://media.api-sports.io/rugby/teams/99.png", "name": "Clermont"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "WLLLW", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "56.52", "total": 13}, "played": 23, "win": {"percentage": "43.48", "total": 10}}, "goals": {"against": 594, "for": 512}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 48, "position": 11, "stage": "Top 14", "team": {"id": 95, "logo": "https://media.api-sports.io/rugby/teams/95.png", "name": "Aviron Bayonnais"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": null, "form": "LWLWL", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "56.52", "total": 13}, "played": 23, "win": {"percentage": "43.48", "total": 10}}, "goals": {"against": 671, "for": 544}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 47, "position": 12, "stage": "Top 14", "team": {"id": 101, "logo": "https://media.api-sports.io/rugby/teams/101.png", "name": "Lyon"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": "Top 14 (Relegation)", "form": "LLLLL", "games": {"draw": {"percentage": "0.00", "total": 0}, "lose": {"percentage": "65.22", "total": 15}, "played": 23, "win": {"percentage": "34.78", "total": 8}}, "goals": {"against": 548, "for": 464}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 40, "position": 13, "stage": "Top 14", "team": {"id": 102, "logo": "https://media.api-sports.io/rugby/teams/102.png", "name": "Montpellier"}},
    // {"country": {"code": "FR", "flag": "https://media.api-sports.io/flags/fr.svg", "id": 7, "name": "France"}, "description": "Relegation - Pro D2", "form": "LWLLL", "games": {"draw": {"percentage": "4.35", "total": 1}, "lose": {"percentage": "69.57", "total": 16}, "played": 23, "win": {"percentage": "26.09", "total": 6}}, "goals": {"against": 703, "for": 488}, "group": {"name": "Regular Season"}, "league": {"id": 16, "logo": "https://media.api-sports.io/rugby/leagues/16.png", "name": "Top 14", "season": 2023, "type": "League"}, "points": 30, "position": 14, "stage": "Top 14", "team": {"id": 731, "logo": "https://media.api-sports.io/rugby/teams/731.png", "name": "US Oyonnax"}}]
    // )

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
            {rankings.map((e, index) => {

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