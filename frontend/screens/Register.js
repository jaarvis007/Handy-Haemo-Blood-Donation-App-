import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
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
      }).then((response) => {
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

            {/* logo */}
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Text style={{ ...FONTS.h1, color: COLORS.secondaryGray }}>HANDY</Text>
              <Text
                style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}
              >

              </Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>HAEMO</Text>
            </View>

            {/* inputs */}
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

            {/* button */}

            <Button
              title={"Register"}
              filled
              onPress={handleSubmit}
              style={{
                width: "100%",
              }}
            />

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
