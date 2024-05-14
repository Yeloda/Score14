import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert, Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { BlueSkyIcon, LinkedInIcon, NewTwitterIcon } from './icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawer = props => {

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#8200d6'}}>
                <ImageBackground
                    source={require('../assets/menu-bg.jpeg')}
                    style={{padding: 20}}
                >
                    <Image
                        source={require('../assets/logo_score14.png')}
                        style={{height: 100, width: 100, borderRadius: 40, marginBottom: 10,alignSelf:'center',}}
                    />

                    <Text style={{color: '#fff',fontSize: 18,marginBottom: 5,}}>Score14</Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#fff',marginRight: 5,}}>Le Top14 dans votre poche !</Text>
                    </View>
                </ImageBackground>

                <View style={{flex: 1, backgroundColor: '#212B46', paddingTop: 10}}>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawer;
