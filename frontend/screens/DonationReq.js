import { FlatList, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { donationRequest } from "../constants/Home/Data";
import DonationReqCard from "../constants/Home/DonationReqCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DonationReq = () => {
  const [donationRequest, setdonationRequest] = useState("");
  const [currUser, setCurrUser] = useState("");
  // const navigation = useNavigation();

  useEffect(() => {
    // do stuff here...
    AsyncStorage.getItem("user").then((data) => {
      setCurrUser(JSON.parse(data));
      setdonationRequest(currUser.donationReq);
    });
  }, []);

  console.log(donationRequest);

  return (
    // <ScrollView>-b
    <View style={{ width: "100%", height: "100%" }}>
      {donationRequest === null ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={donationRequest}
          renderItem={({ item }) => <DonationReqCard item={item} />}
        />
      )}
    </View>
    // </ScrollView>
  );
};

export default DonationReq;
