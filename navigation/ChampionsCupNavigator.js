import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { GlobalContext } from '../contexts/GlobalContext';
import ChampionsCupCalendarScreen from '../screens/ChampionsCupRugby/ChampionsCupCalendarScreen';
import ChampionsCupRankingScreen from '../screens/ChampionsCupRugby/ChampionsCupRankingScreen';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const ChampionsCupNavigator = ({ navigation,route }) => {

    const { isFrench } = useContext(GlobalContext);

    return (
        <Navigator
            activeColor="white"
            inactiveColor="#575757"
            barStyle={{ height: Platform.OS == 'ios' ? 90 : 70, backgroundColor: '#333333', }}
            shifting={false}
            theme={{colors: {secondaryContainer: '#009ba3'}}}
        >
            <Screen name={isFrench ? 'Calendrier' : 'Calendar'} component={ChampionsCupCalendarScreen}
                options={{
                    tabBarIcon: ({size,focused,color}) => {
                        return <AntDesign name="calendar" size={24} color={color} />
                    },
                }}
            />
            <Screen name={isFrench ? 'Classement' : 'Ranking'} component={ChampionsCupRankingScreen} 
                options={{
                    tabBarIcon: ({size,focused,color}) => {
                        return <MaterialIcons name="leaderboard" size={24} color={color} />
                    },
                }}
            />
        </Navigator>
    )
};

export default ChampionsCupNavigator
