import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import EuroRankingScreen from '../screens/EuroFootball/EuroRankingScreen';
import EuroCalendarScreen from '../screens/EuroFootball/EuroCalendarScreen';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const EuroNavigator = ({ navigation,route }) => {
    return (
        <Navigator
            activeColor="white"
            inactiveColor="#575757"
            barStyle={{ height: Platform.OS == 'ios' ? 90 : 70, backgroundColor: '#333333', }}
            shifting={false}
            theme={{colors: {secondaryContainer: '#009ba3'}}}
        >
            <Screen name='Classement' component={EuroRankingScreen} 
                options={{
                    tabBarIcon: ({size,focused,color}) => {
                        return <MaterialIcons name="leaderboard" size={24} color={color} />
                    },
                }}
            />
            <Screen name='Calendrier' component={EuroCalendarScreen}
                options={{
                    tabBarIcon: ({size,focused,color}) => {
                        return <AntDesign name="calendar" size={24} color={color} />
                    },
                }}
            />
        </Navigator>
    )
};

export default EuroNavigator
