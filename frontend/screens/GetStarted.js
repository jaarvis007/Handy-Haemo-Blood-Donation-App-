import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { images, COLORS, FONTS, SIZES } from "../constants";
import Button from "../components/Button";
// import Input from "../components/input";
// import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const GetStarted = ({ navigation }) => {
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
            style={{
              tintColor: COLORS.primary,
              marginVertical: 80,
            }}
          />

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

          <View style={{ marginVertical: 40 }}>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Be the Reason Someone Smiles, Donate Blood.
            </Text>
          </View>
        </View>
        <Button
          title={"Login"}
          onPress={() => navigation.navigate("Login")}
          style={{
            width: "80%",
            marginHorizontal: SIZES.padding + 27,
            marginBottom: SIZES.padding,
          }}
        />
        <Button
          title={"Register"}
          onPress={() => navigation.navigate("Register")}
          filled
          style={{
            width: "80%",
            marginHorizontal: SIZES.padding + 27,
            marginBottom: SIZES.padding,
          }}
        />
      </PageContainer>
    </SafeAreaView>
  );
};

export default GetStarted;
