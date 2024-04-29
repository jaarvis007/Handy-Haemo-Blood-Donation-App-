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
  
  const handleSearch = async () => {
    // Perform API call with the searchKey
    // console.log(searchKey);
    try {
      const response = await fetch(
        `http://172.31.93.14:8080/api/v1/fetch/search?searchItem=${currUser}`
      ); // Replace with your API endpoint
      if (!response.ok) {
        console.warn("Error in response");
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      if (jsonData.data.length === 0) {
        Alert.alert("No Data Found");
      }
      setdonationRequest(jsonData.data.donationReq); // Update state with fetched data
      // consle.log(donationdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

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
