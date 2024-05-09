import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const Otp = () => {
  const [otp, setOTP] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      console.log(name, bloodtype, phone, location, email, password);
      if (!email || !password || !name || !phone || !location || !bloodtype) {
        Alert.alert("Please Provide All Fields");
        return;
      }
      Axios.post(`${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/auth/register`, {
        name,
        bloodtype,
        phone,
        location,
        email,
        password,
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            Alert.alert("Register Successfull");
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          Alert.alert("Error", err.message);
          console.log(err);
        });
    } catch (err) {
      Alert.alert("Error", err.message);
      console.log(err);
    }
  };

  const handleVerifyOTP = () => {
    // Validate OTP here, for example, you might want to check if it's 6 digits long
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    // You can then send the OTP to your backend for verification
    // For demo purposes, let's just display it
    Alert.alert("OTP Verified", `Entered OTP: ${otp}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOTP}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Otp;
