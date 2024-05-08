import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "../constants/Home/Slider";
import Body from "../constants/Home/Body";
import DonationComponent from "../constants/Home/DonationComponent";
import { COLORS, FONTS } from "../constants";
// import { donationdata } from "../constants/Home/Data";
// import 'dotenv/config';

const Home = () => {
  const [donationdata, setdonationdata] = useState(null);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/fetch/data`
      ); // Replace with your API endpoint
      if (!response.ok) {
        console.warn("Error in response");
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setdonationdata(jsonData.data); // Update state with fetched data
      // consle.log(donationdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (donationdata === null) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {donationdata === null ? (
        <ActivityIndicator size="large" color="blue" />
      ) : donationdata.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <FlatList
          data={donationdata}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: '10%',
                  marginBottom: "10%",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text style={{ ...FONTS.h1, color: COLORS.primary }}>HANDY</Text>
                <Text
                  style={{
                    ...FONTS.h1,
                    color: COLORS.black,
                    marginHorizontal: 1,
                  }}
                >
                  -
                </Text>
                <Text style={{ ...FONTS.h1, color: COLORS.primary }}>HAEMO</Text>
              </View>
              <Slider />
              <Body />
            </View>
          )}
          renderItem={({ item }) => <DonationComponent item={item} />}
        />
      )}
    </View>
  );
};

export default Home;
