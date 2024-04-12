import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { images, COLORS, FONTS, SIZES } from "../constants";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button";
import Input from "../components/input";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      if (!email || !password) {
        Alert.alert("All fields are mandotary");
      }
      console.log(email, password);
      Axios.post("http://172.31.93.14:8080/api/v1/auth/login", {
        email,
        password,
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.user);
            // console.log("response " + JSON.parse(response).data);
            // AsyncStorage.setItem("user",response.data.user);
            navigation.navigate("Home");
            Alert.alert("Login SuccessFul");
            console.log("Login SuccessFul");
          }
        })
        .catch((err) => {
          Alert.alert('Error', err.message); 
          console.log(err);
        });
    } catch (err) {
            Alert.alert('Error', err.message); 

      console.log(err);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
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
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Dare</Text>
            <Text
              style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}
            >
              To
            </Text>
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Donate</Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Input
              icon="email"
              iconPack={MaterialIcons}
              id="email"
              placeholder="Enter your Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              value={email}
            />

            <Input
              icon="lock"
              iconPack={FontAwesome}
              id="password"
              autoCapitalize="none"
              placeholder="Enter your Password"
              secureTextEntry
              onChangeText={password => setPassword(password)}
              value={password}
            />
          </View>

          <Button
            title={"Login"}
            filled
            // onPress={() => navigation.navigate("Home")}
            onPress={handleSubmit}
            style={{
              width: "100%",
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.primary,
                marginVertical: 12,
              }}
            >
              Fogot Password
            </Text>
          </TouchableOpacity>

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
              Don't have an account?{" "}
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Login;
