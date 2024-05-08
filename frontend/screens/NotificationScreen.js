import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import NotificationCard from './NotificationCard';
import { COLORS, FONTS } from '../constants';
import { Button } from 'react-native-elements';
import colorValue from '../constants/ColorValue';
import { useNavigation } from '@react-navigation/native';
import { Axios } from 'axios';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [userDetail, setUserDetail] = useState("");
  const [notification, setnotification] = useState("");

  useEffect(() => {
    const keys = AsyncStorage.getAllKeys();
    if (keys.length === 0) return;

    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        const user = JSON.parse(data);
        setUserDetail(user)

        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/fetch/search?searchItem=${user.email}`
          ); // Replace with your API endpoint
          if (!response.ok) {
            console.warn("Error in response");
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setnotification(jsonData.data[0].notification); // Update state with fetched data
          // console.log(jsonData.data[0].donationReq);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const handleClear = () => {
    // e.preventDefault();
    // Assuming you're using fetch API
    console.log(notification)
    fetch(`${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/func/clearNotification/` + userDetail.email, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful response
        Alert.alert("Notification Cleared Successfully")
      })
      .catch(error => {
        // Handle error
        console.error('There was a problem with the request:', error);
      });

  };

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flexDirection: "row",
          marginTop: '10%',
          marginBottom: "10%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>NOTI</Text>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.black,
            marginHorizontal: 1,
          }}
        >
          FICA
        </Text>
        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>TION</Text>
      </View>
      {/* <ScrollView> */}
      <View>
        <FlatList
          data={notification}
          renderItem={({ item }) => <NotificationCard item={item} />}
        />
      </View>
      {/* </ScrollView> */}

      <View
        style={{
          justifyContent: "center",
          marginTop: 190
        }}>
        <Button
          title="Back"
          onPress={() => { navigation.navigate("BottomNavigation") }}
          iconContainerStyle={{ marginLeft: 63 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(199, 43, 98, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 100,
            marginVertical: 10,
          }}
        />
        <Button
          title="Clear"
          onPress={() => { handleClear() }}
          iconContainerStyle={{ marginLeft: 63 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(199, 43, 98, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 100,

          }}
        />
      </View>


    </GestureHandlerRootView>
  )
}

export default NotificationScreen;