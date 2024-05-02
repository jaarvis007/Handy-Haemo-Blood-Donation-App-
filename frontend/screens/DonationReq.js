import { FlatList, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { donationRequest } from "../constants/Home/Data";
import DonationReqCard from "../constants/Home/DonationReqCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DonationReq = () => {
  const [donationRequest, setdonationRequest] = useState("");

  useEffect(() => {

    const keys = AsyncStorage.getAllKeys();
    if (keys.length === 0) return;

    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        const user = JSON.parse(data);

        try {
          const response = await fetch(
            `http://172.31.93.14:8080/api/v1/fetch/search?searchItem=${user.email}`
          ); // Replace with your API endpoint
          if (!response.ok) {
            console.warn("Error in response");
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setdonationRequest(jsonData.data[0].donationReq); // Update state with fetched data
          // console.log(jsonData.data[0].donationReq);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Poll AsyncStorage every 5 seconds for changes
    // const intervalId = setInterval(fetchData, 5000);
    // return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);


  console.log(donationRequest)

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
