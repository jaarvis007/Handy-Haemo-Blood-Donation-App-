import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';




const userDetail =  AsyncStorage.getItem("user");
// const userObj = JSON.parse(userDetail);

const Home = () => {
  return (
    <View>
      <Text>Welcome {userDetail.name}</Text>
    </View>
  );
};

export default Home;
