import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { COLORS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function WantToDonate() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user").then((data) => {
      setUserDetail(JSON.parse(data));
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSubmit = async (visible) => {
    try {
      if (location == null || userDetail == null) {
        Alert.alert("Fields not present");
        return;
      }

      const dataToSend = {
        coords: location.coords,
        mocked: location.mocked,
        timestamp: location.timestamp,
        email: userDetail.email,
        name: userDetail.name,
        visible: visible,
      };

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/location/update-location`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save location data");
      }

      if (visible) Alert.alert("Your visibility is ON now");
      else Alert.alert("Your visibility is OFF now");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Want</Text>
            <Text style={styles.logoText1}>To</Text>
            <Text style={styles.logoText}>Donate</Text>
          </View>

          {location === null ? <Text>Can't Get Your Location</Text> : <></>}
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => handleSubmit(true)}
              filled
              title="Visibility On"
            />
            <Button
              onPress={() => handleSubmit(false)}
              title="Visibility Off"
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("BottomNavigation")}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back To Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  logoText: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginHorizontal: 8,
  },
  logoText1: {
    ...FONTS.h1,
    color: COLORS.black,
    marginHorizontal: 8,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
});
