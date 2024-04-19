import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Home,GetStarted} from '../screens';
import {Icon, Badge} from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { images, COLORS, FONTS, SIZES } from "../constants";
import Profile from '../screens/Profile';
import DonationReq from '../screens/DonationReq';
import SearchScreen from '../screens/SearchScreen';
import { commonStyle,commonJustify} from '../constants/commonStyle';
import fontValue from '../constants/FontValue';
import { TouchableOpacity } from 'react-native-gesture-handler';

// const Tab = createMaterialBottomTabNavigator();
const Tab=createBottomTabNavigator();

const BottomNavigation = () => {
  return (
     <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
      }}
      >
        <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="home" size={24} color={color} />
          ),
          title: '',
          headerLeft: () => (
            <View style={{marginHorizontal:5}}>
              <Image
                resizeMode="contain"
                style={{width:25}}
                source={require('../assets/images/img2/menu.png')}
              />
            </View>
          ),

          headerRight: () => (
            <View style={{marginHorizontal:5}}>
             <View  >
             {/* <Badge value={10} /> */}
             </View>
              <Fontisto name="bell" size={25} />
            </View>
          ),
        }}
      />


       <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="search" size={24} color={color} />
          ),
          title: '',
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Image
                resizeMode="contain"
                style={{width:25,height:25,marginLeft:5}}
                source={require('../assets/images/img2/menu.png')}
              />
              <Text 
              style={
                [commonStyle({fontSize:16,fontFamily:fontValue.PoninsBold}).text,
                {marginLeft:10}]
              }>Search</Text>
            </View>
          ),

          headerRight: () => (
            <View style={{marginHorizontal:5}}>
             <View  >
             {/* <Badge value={10} /> */}
             </View>
              <Fontisto name="bell" size={25} />
            </View>
          ),
        }}
      />


      <Tab.Screen
        name="DonationRequestScreen"
        component={DonationReq}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
          title: '',
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Image
                resizeMode="contain"
                style={{width:25,height:25,marginLeft:5}}
                source={require('../assets/images/img2/menu.png')}
              />
              <Text 
              style={
                [commonStyle({fontSize:16,fontFamily:fontValue.PoninsBold}).text,
                {marginLeft:10}]
              }>Donation Request</Text>
            </View>
          ),

          headerRight: () => (
            <View style={{marginHorizontal:5}}>
             <View  >
             {/* <Badge value={10} /> */}
             </View>
              <Fontisto name="bell" size={25} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="user" size={24} color={color} />
          ),
          title: '',
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Image
                resizeMode="contain"
                style={{width:25,height:25,marginLeft:5}}
                source={require('../assets/images/img2/menu.png')}
              />
              <Text 
              style={
                [commonStyle({fontSize:16,fontFamily:fontValue.PoninsBold}).text,
                {marginLeft:10}]
              }>Profile</Text>
            </View>
          ),

          headerRight: () => (
            <View style={{marginHorizontal:5}}
            onPress={() => navigation.navigate("ResetPassword")}>
              <Feather name="edit" size={25}/>
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomNavigation