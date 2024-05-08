import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { images, COLORS, FONTS, SIZES } from "../constants";
import { MaterialIcons, FontAwesome, Fontisto } from "@expo/vector-icons";
import Button from "../components/Button";
import Input from "../components/input";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UpdateInfo = () => {

  const [name, setName] = useState("");
  const [location,setLocation]=useState("");
  const [bloodtype,setBloodType]=useState("");

  const [userDetail,setUserDetail]=useState('');
  const navigation=useNavigation();

  useEffect(()=>{
        // do stuff here...
        AsyncStorage.getItem("user")
        .then(data => {
          setUserDetail(JSON.parse(data));
  })
  }, [])

  const handleSubmit = (e) => {

    console.log(name, bloodtype,location,userDetail.email);
    e.preventDefault();

    try {
      Axios.post(`${ process.env.EXPO_PUBLIC_CLIENT_URL }/api/v1/auth/update`, {
        name,
        bloodtype,
        location,
        email:userDetail.email,
      })
        .then((response) => {
          if (response.data.success) {
             console.log(response);
             Alert.alert("Update Successful"); 
            //  AsyncStorage.clear();
             navigation.navigate("Login");
          }
        })
        .catch((err) => {
          Alert.alert('Error', err.message); 
          console.log(err);
        });
    } catch (err) {
       Alert.alert('Error in Updating', err.message); 
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
              marginTop:52,
              marginHorizontal: 52,
              alignItems: "center",
            }}
          >
      

            {/* logo */}
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Update</Text>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.black,
                  marginHorizontal: 8,
                }}
              >
                The 
              </Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Profile</Text>
            </View>

            {/* inputs */}
            <View style={{ marginVertical: 20 }}>
              <Input
                icon="user"
                iconPack={FontAwesome}
                id="fullname"
                placeholder="Update your Name"
                onChangeText={name => setName(name)}
                value={name}
              />
              {/* <Input
                icon="phone"
                iconPack={FontAwesome}
                id="phone number"
                placeholder="Enter your phone number"
                onChangeText={phone => setPhone(phone)}
                value={phone}
              /> */}

              <Input
                icon="blood-drop"
                iconPack={Fontisto}
                id="bloodtype"
                placeholder="Update your blood type"
                onChangeText={bloodtype => setBloodType(bloodtype)}
                value={bloodtype}
              />

              <Input
                icon="location-on"
                iconPack={MaterialIcons}
                id="location"
                placeholder="Update your location"
                onChangeText={location => setLocation(location)}
                value={location}
              />
              {/* <Input
                icon="email"
                iconPack={MaterialIcons}
                id="email"
                placeholder="Enter your Email"
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
              /> */}
            </View>

            {/* button */}

            <Button
              title={"Update"}
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
          

              <TouchableOpacity onPress={() => navigation.navigate("BottomNavigation")}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.primary,
                  }}
                >
                 Back To Profile
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  )
}

export default UpdateInfo