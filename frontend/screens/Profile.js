import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Icon, ListItem } from "react-native-elements";
import colorValue from "../constants/ColorValue";
import { commonJustify, commonStyle } from "../constants/commonStyle";
import fontValue from "../constants/FontValue";
import { color } from "react-native-elements/dist/helpers";
import { AntDesign } from "@expo/vector-icons";
import { getData, getMyObject } from "../global/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUser } from '../global/userContext';

const Profile = () => {
  // const userDetail = useUser();
  const [userDetail, setUserDetail] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // do stuff here...
    AsyncStorage.getItem("user").then((data) => {
      setUserDetail(JSON.parse(data));
      console.log(userDetail)
      setIsLoading(false);
    });
  }, []);

  console.log(userDetail)



  const clearAsyncStorageAndNavigate = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.clear();
      // Check if AsyncStorage is empty
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        // AsyncStorage is empty, navigate to another screen
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all data in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        navigation.navigate("OnBoardingScreen");
        Alert.alert("Logout successfully.");
      }
      // Optionally, you can perform additional actions after clearing data
    } catch (error) {
      console.error("Error ", error);
      // Handle errors, if any
    }
  };

  return (
    <View>
      {isLoading ? (<ActivityIndicator size="large" color="#0000ff" />) :
        (
          <ScrollView>
            <View>
              <View style={[commonJustify.rowCenter, { marginVertical: 20 }]}>
                <Avatar
                  size={100}
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: colorValue.primary }}
                />
              </View>

              <View>
                <Text
                  style={[
                    commonStyle({ fontSize: 25, color: colorValue.liteDark3 }).text,
                    commonJustify.textCenter,
                  ]}
                >
                  {userDetail.name}
                </Text>
              </View>
              <View style={[commonJustify.rowCenter, { marginVertical: 10 }]}>
                <Icon name="map" />
                <Text
                  style={[
                    commonStyle({ fontSize: 15, color: colorValue.liteDark3 }).text,
                    commonJustify.textCenter,
                  ]}
                >
                  {userDetail.location}
                </Text>
              </View>

              {/* <View style={[commonJustify.rowSpaceEvenly, { marginVertical: 20 }]}>
                <Button
                  buttonStyle={{ backgroundColor: colorValue.info }}
                  title="Call Now"
                />

                <Button
                  buttonStyle={{ backgroundColor: colorValue.primary }}
                  title="Request"
                />
              </View> */}

              <View style={commonJustify.rowSpaceEvenly}>
                <View style={style.card}>
                  <Text
                    style={[
                      commonStyle({ fontSize: 24, fontFamily: fontValue.PoninsBold })
                        .text,
                      { textAlign: "center" },
                    ]}
                  >
                    {userDetail.bloodtype}
                  </Text>
                  <Text
                    style={[
                      commonStyle({
                        fontSize: 14,
                        fontFamily: fontValue.PoppinsRegular,
                      }).text,
                      { textAlign: "center" },
                    ]}
                  >
                    BloodType
                  </Text>
                </View>
                <View style={style.card}>
                  <Text
                    style={[
                      commonStyle({ fontSize: 24, fontFamily: fontValue.PoninsBold })
                        .text,
                      { textAlign: "center" },
                    ]}
                  >
                    {userDetail.donationCnt}
                  </Text>
                  <Text
                    style={[
                      commonStyle({
                        fontSize: 14,
                        fontFamily: fontValue.PoppinsRegular,
                      }).text,
                      { textAlign: "center" },
                    ]}
                  >
                    Donated
                  </Text>
                </View>
                <View style={style.card}>
                  <Text
                    style={[
                      commonStyle({ fontSize: 24, fontFamily: fontValue.PoninsBold })
                        .text,
                      { textAlign: "center" },
                    ]}
                  >
                    {userDetail.requestCnt}
                  </Text>
                  <Text
                    style={[
                      commonStyle({
                        fontSize: 14,
                        fontFamily: fontValue.PoppinsRegular,
                      }).text,
                      { textAlign: "center" },
                    ]}
                  >
                    Requested
                  </Text>
                </View>
              </View>

              <View style={{ marginVertical: 15 }}>
                <ListItem
                  containerStyle={[{ marginTop: 10 }, { marginHorizontal: 10 }]}
                  bottomDivider
                >
                  <Icon color={colorValue.primary} name="phone" />
                  <ListItem.Content>
                    <ListItem.Title>Contact: {userDetail.phone}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>

                <ListItem
                  containerStyle={[{ marginTop: 10 }, { marginHorizontal: 10 }]}
                  bottomDivider
                >
                  <Icon color={colorValue.primary} name="mail" />
                  <ListItem.Content>
                    <ListItem.Title>E-mail : {userDetail.email}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>

                <ListItem
                  // style={{backgroundColor:colorValue.primary}}
                  onPress={clearAsyncStorageAndNavigate}
                  containerStyle={[{ marginTop: 10 }, { marginHorizontal: 10 }]}
                  bottomDivider
                >
                  <Icon color={colorValue.primary} name="logout" />
                  <ListItem.Content>
                    <ListItem.Title>LogOut</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </View>
            </View>

          </ScrollView>)}
    </View>

  );
};

export default Profile;

const style = StyleSheet.create({
  card: {
    backgroundColor: colorValue.white,
    padding: 10,
  },
});
