import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import colorValue from "../constants/ColorValue";
import { commonJustify, commonStyle } from "../constants/commonStyle";
import fontValue from "../constants/FontValue";

const NotificationCard = ({ item }) => {
  console.log(item);
  if (item.status === "accept") {
    return (
      <TouchableOpacity
        style={[styles.acceptmain, commonJustify.rowSpaceBetween]}
      >
        <Avatar
          rounded
          size={"medium"}
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={[
            { backgroundColor: colorValue.primary },
            commonJustify.center,
          ]}
        />

        <View style={commonJustify.center}>
          <Text>{item.name} accepted your request. </Text>
          {/* <Text style={commonStyle({ fontSize: 15, fontFamily: fontValue.PoninsBold, color: colorValue.liteDark2 }).text}>
                    {item.status}
                </Text> */}
        </View>
      </TouchableOpacity>
    );
  } else if (item.status === "request") {
    return (
      <TouchableOpacity style={[styles.reqmain, commonJustify.rowSpaceBetween]}>
        <Avatar
          rounded
          size={"medium"}
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={[
            { backgroundColor: colorValue.primary },
            commonJustify.center,
          ]}
        />

        <View style={commonJustify.center}>
          <Text>{item.name} requested for blood donation. </Text>
          {/* <Text style={commonStyle({ fontSize: 15, fontFamily: fontValue.PoninsBold, color: colorValue.liteDark2 }).text}>
                    {item.status}
                </Text> */}
        </View>
      </TouchableOpacity>
    );
  } else if (item.status === "reject") {
    return (
      <TouchableOpacity
        style={[styles.rejectmain, commonJustify.rowSpaceBetween]}
      >
        <Avatar
          rounded
          size={"medium"}
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={[
            { backgroundColor: colorValue.primary },
            commonJustify.center,
          ]}
        />

        <View style={commonJustify.center}>
          <Text>{item.name} rejected your request </Text>
          {/* <Text style={commonStyle({ fontSize: 15, fontFamily: fontValue.PoninsBold, color: colorValue.liteDark2 }).text}>
                    {item.status}
                </Text> */}
        </View>
      </TouchableOpacity>
    );
  }

  return <Text>NO NOTIFICATION</Text>;
};

export default NotificationCard;

const styles = StyleSheet.create({
  reqmain: {
    marginVertical: 10,
    backgroundColor: colorValue.info,
    borderRadius: 10,
    marginHorizontal: "5%",
  },
  rejectmain: {
    marginVertical: 10,
    backgroundColor: colorValue.liteDark2,
    borderRadius: 10,
    marginHorizontal: "5%",
  },
  acceptmain: {
    marginVertical: 10,
    backgroundColor: colorValue.primary,
    borderRadius: 10,
    marginHorizontal: "5%",
  },
});
