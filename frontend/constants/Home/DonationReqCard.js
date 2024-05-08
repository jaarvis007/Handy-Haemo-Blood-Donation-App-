import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Axios from "axios";
import { Button } from "react-native-elements";
import colorValue from "../ColorValue";
import { commonJustify, commonStyle } from "../commonStyle";
import fontValue from "../FontValue";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DonationReqCard = ({ item }) => {
  const [targetUser, setTargetUser] = useState("");
  const [currUser, setCurrUser] = useState("");

  useEffect(() => {
    // do stuff here...
    AsyncStorage.getItem("user").then((data) => {
      setCurrUser(JSON.parse(data));
    });
  }, []);

  const handleAcceptReg = (e) => {
    setTargetUser(e);
    generateAcceptReq();
  };

  const handleRejectReg = (e) => {
    setTargetUser(e);
    generateRejectReq();
  };

  const generateAcceptReq = (e) => {
    // e.preventDefault();
    try {
      if (!currUser || !targetUser) {
        Alert.alert("Try Again Please...");
        return;
      }
      Axios.post(`${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/func/acceptReq`, {
        currUser,
        targetUser,
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            Alert.alert("Requested Successfull");
          }
        })
        .catch((err) => {
          Alert.alert("Error", err);
          console.log(err);
        });
    } catch (err) {
      Alert.alert("Error", err.message);
      console.log(err);
    }
  };

  const generateRejectReq = (e) => {
    // e.preventDefault();
    try {
      if (!currUser || !targetUser) {
        Alert.alert("Try Again Please...");
        return;
      }
      Axios.post(`${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/func/rejectReq`, {
        currUser,
        targetUser,
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            Alert.alert("Requested Successfull");
          }
        })
        .catch((err) => {
          Alert.alert("Error", err);
          console.log(err);
        });
    } catch (err) {
      Alert.alert("Error", err.message);
      console.log(err);
    }
  };

  return (
    <View style={[styles.main, commonJustify.rowSpaceBetween]}>
      <View>
        <View style={[styles.margin]}>
          <Text style={commonStyle({ fontSize: 13 }).text}>Name</Text>
          <Text
            style={
              commonStyle({ fontSize: 14, color: colorValue.liteDark2 }).text
            }
          >
            {item.name}
          </Text>
        </View>

        <View style={[styles.margin]}>
          <Text style={commonStyle({ fontSize: 13 }).text}>Location</Text>
          <Text
            style={
              commonStyle({ fontSize: 14, color: colorValue.liteDark2 }).text
            }
          >
            {item.location}
          </Text>
        </View>

        <View style={[styles.margin]}>
          <Text style={commonStyle({ fontSize: 13 }).text}>{item.time}</Text>
        </View>
      </View>

      <View style={{ paddingTop: 25 }}>
        {/* <Image
          style={{ width: 100 }}
          resizeMode="contain"
          source={require("../../assets/images/img2/BloodGroup.png")}
        /> */}
        <Button
          onPress={() => handleAcceptReg(item)}
          titleStyle={{ color: colorValue.primary }}
          type="clear"
          title="Accept"
        />
        <Button
          onPress={() => handleRejectReg(item)}
          titleStyle={{ color: colorValue.primary }}
          type="clear"
          title="Reject"
        />
      </View>
    </View>
  );
};

export default DonationReqCard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    marginTop: 10,
  },
  margin: {
    marginLeft: 10,
    padding: 5,
  },
});
