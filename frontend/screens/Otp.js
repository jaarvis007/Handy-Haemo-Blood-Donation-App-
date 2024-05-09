import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios"; // Correct import

const Otp = (props) => {
  const navigation = useNavigation();
  const formdata = props.route.params;
  const [otp, setOTP] = useState("");

  const handleSubmit = () => {
    try {
      console.log(formdata, otp);
      if (otp.length !== 6) {
        Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
        return;
      }
      Axios.post(`${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/auth/register`, {
        name: formdata.name,
        bloodtype: formdata.bloodtype,
        phone: formdata.phone,
        location: formdata.location,
        email: formdata.email,
        password: formdata.password,
        otp,
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            Alert.alert("Register Successfully");
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

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(formdata)}</Text>
      <Text style={styles.title}>OTP Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOTP}
      />
      <Button title="Verify OTP" onPress={handleSubmit} />
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
