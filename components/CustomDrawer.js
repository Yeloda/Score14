import React, { useContext } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert, Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { BlueSkyIcon, LinkedInIcon, NewTwitterIcon } from './icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../contexts/GlobalContext';

const CustomDrawer = props => {

    const { isFrench } = useContext(GlobalContext);

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#8200d6'}}>
                <ImageBackground
                    source={require('../assets/menu-bg.jpeg')}
                    style={{padding: 20}}
                >
                    <Image
                        source={require('../assets/logo_avec_texte.png')}
                        style={{height: 100, width: 100, borderRadius: 10, marginBottom: 10,alignSelf:'center',}}
                    />

                    <Text style={{color: '#fff',fontSize: 18,marginBottom: 5,}}>Score14</Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#fff',marginRight: 5,}}>
                            {isFrench ? 'Votre Hub Sportif Complet !' : 'Your Complete Sports Hub!'}
                        </Text>
                    </View>
                </ImageBackground>

                <View style={{flex: 1, backgroundColor: '#333333', paddingTop: 10}}>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawer;
