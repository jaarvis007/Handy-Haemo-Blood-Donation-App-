import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { images, COLORS, FONTS, SIZES } from "../constants";
import { MaterialIcons, FontAwesome, Fontisto } from "@expo/vector-icons";
import Button from "../components/Button";
import Input from "../components/input";
import Axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bloodtype, setBloodType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !name || !phone || !location || !bloodtype) {
        Alert.alert("Please Provide All Fields");
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address");
        return;
      }

      if (password.length < 6) {
        Alert.alert(
          "Weak Password",
          "Password must be at least 6 characters long"
        );
        return;
      }

      if (!isValidBloodType(bloodtype)) {
        Alert.alert(
          "Invalid Blood Type",
          "Please enter a valid blood type (e.g., A+, B-, AB+, O-)"
        );
        return;
      }

      setLoading(true); // Set loading state to true

      Axios.post(`${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/auth/sendOTP`, {
        name,
        bloodtype,
        phone,
        location,
        email,
        password,
      })
        .then((response) => {
          setLoading(false); // Set loading state to false after receiving response
          if (response.data.success) {
            Alert.alert("OTP Send Successfully");
            navigation.navigate("Otp", {
              name,
              bloodtype,
              phone,
              location,
              email,
              password,
            });
          } else {
            Alert.alert(response.message);
            return;
          }
        })
        .catch((err) => {
          setLoading(false); // Set loading state to false in case of error
          Alert.alert("Error", err.message);
          console.log(err);
        });
    } catch (err) {
      setLoading(false); // Set loading state to false in case of error
      Alert.alert("Error", err.message);
      console.log(err);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  const isValidBloodType = (bloodType) => {
    const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    return validBloodTypes.includes(bloodType.toUpperCase());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <View
            style={{
              flex: 1,
              marginHorizontal: 22,
              alignItems: "center",
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                tintColor: COLORS.primary,
                marginVertical: 48,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Text style={{ ...FONTS.h1, color: COLORS.secondaryGray }}>
                HANDY
              </Text>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.black,
                  marginHorizontal: 8,
                }}
              ></Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>HAEMO</Text>
            </View>

            <View style={{ marginVertical: 20 }}>
              <Input
                icon="user"
                iconPack={FontAwesome}
                id="fullname"
                placeholder="Enter your Name"
                onChangeText={(name) => setName(name)}
                value={name}
              />
              <Input
                icon="phone"
                iconPack={FontAwesome}
                id="phone number"
                placeholder="Enter your phone number"
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
              />

              <Input
                icon="blood-drop"
                iconPack={Fontisto}
                id="bloodtype"
                placeholder="Enter your blood type"
                onChangeText={(bloodtype) => setBloodType(bloodtype)}
                value={bloodtype}
              />

              <Input
                icon="location-on"
                iconPack={MaterialIcons}
                id="location"
                placeholder="Enter your location"
                onChangeText={(location) => setLocation(location)}
                value={location}
              />
              <Input
                icon="email"
                iconPack={MaterialIcons}
                id="email"
                placeholder="Enter your Email"
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
                value={email}
              />
              <Input
                icon="lock"
                iconPack={FontAwesome}
                id="password"
                autoCapitalize="none"
                placeholder="Enter your Password"
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
            </View>

            <Button
              title={"Register"}
              filled
              onPress={handleSubmit}
              style={{
                width: "100%",
              }}
            />

            {loading && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )}

            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black,
                }}
              >
                Already have an account?{" "}
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.primary,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Register;
