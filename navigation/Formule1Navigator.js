import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Formule1RankingScreen from '../screens/formule1/Formule1RankingScreen';
import Formule1CalendarScreen from '../screens/formule1/Formule1CalendarScreen';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const Formule1Navigator = ({ navigation,route }) => {
    return (
        <Navigator
            activeColor="white"
            inactiveColor="#575757"
            barStyle={{ height: Platform.OS == 'ios' ? 90 : 70, backgroundColor: '#333333', }}
            shifting={false}
            theme={{colors: {secondaryContainer: '#009ba3'}}}
        >
            <Screen name='Classement' component={Formule1RankingScreen} 
                options={{
                    tabBarIcon: ({size,focused,color}) => {
                        return <MaterialIcons name="leaderboard" size={24} color={color} />
                    },
                }}
            />
            <Screen name='Calendrier' component={Formule1CalendarScreen}
                options={{
                    tabBarIcon: ({size,focused,color}) => {
                        return <AntDesign name="calendar" size={24} color={color} />
                    },
                }}
            />
        </Navigator>
    )
};

export default Formule1Navigator
