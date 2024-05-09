import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "#ff2156" : "#808080";

  return (
    <View
      style={{
        height: 5,
        width: 5,
        marginHorizontal: 4,
        backgroundColor,
      }}
    />
  );
};

const Done = ({ ...props }) => {
  <TouchableOpacity
    style={{
      marginRight: 12,
    }}
    {...props}
  >
    <Text style={{ color: "#ff2156" }}>Done</Text>
  </TouchableOpacity>;
};

const OnBoardingStarter = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.navigate("BottomNavigation")}
      onDone={() => navigation.navigate("GetStarted")}
      DotComponent={Dots}
      bottomBarColor="#ffffff"
      // DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: "#ffa",
          image: (
            <Image source={require("../assets/images//onboarding_1.png")} />
          ),
          title: "Find Blood Donors",
          subtitle: "Urgent Need? Get Donors Right Now!!",
          // titleStyles: [styles.title, { marginBottom: 5 }],
        },

        {
          backgroundColor: "#fff",
          image: (
            <Image source={require("../assets/images/onboarding_2.png")} />
          ),
          title: "Donate Blood, Distribute Pleasures",
          subtitle: "Join the lifesaving community, donate blood!",
          // titleStyles: [styles.title, { marginBottom: 5 }],
        },
      ]}
    />
  );
};

export default OnBoardingStarter;
