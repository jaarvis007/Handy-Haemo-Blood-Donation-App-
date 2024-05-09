import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GetStarted,
  Home,
  Login,
  OTPVerification,
  OnBoardingStarter,
  Register,
  ResetPassword,
  SucessVerification,
  Location,
} from "./screens";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import FlashScreen from "./Flash/FlashScreen";
import BottomNavigation from "./Navigation/BottomNavigation";
import UpdateInfo from "./screens/UpdateInfo";
import Testing from "./screens/Testing";
import NotificationScreen from "./screens/NotificationScreen";
import SearchProfile from "./screens/SearchProfile";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NearBySearch from "./screens/NearBySearch";
import WantToDonate from "./screens/WantToDonate";
import { UserProvider } from "./global/userContext";
import EligibilityCheck from "./screens/EligibilityCheck";
import AboutUsPage from "./screens/AboutUsPage";
import Otp from "./screens/Otp";
// import 'dotenv/config'
// require('dotenv').config()

console.log(process.env.CLIENT_URL);

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setisFirstLaunch] = useState(null);
  const [islogin, setislogin] = useState(null);

  useEffect(() => {}, []);

  const [fontsLoaded] = useFonts({
    black: require("./assets/Font/Poppins-Black.ttf"),
    bold: require("./assets/Font/Poppins-Bold.ttf"),
    medium: require("./assets/Font/Poppins-Medium.ttf"),
    regular: require("./assets/Font/Poppins-Regular.ttf"),
    semiBold: require("./assets/Font/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <EligibilityCheck />
    // <Testing />
    // <MapScreen/>
    // <FlashScreen />
    // <BottomNavigation/>
    // <NotificationScreen />
    // <MapScreen/>
    // <LocationComponent/>
    // <GestureHandlerRootView>
    <UserProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          // initialRouteName={isFirstLaunch ? "OnBoardingStarter" : "GetStarted"}
          initialRouteName={Login}
        >
          <Stack.Screen
            name="OnBoardingStarter"
            component={OnBoardingStarter}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerification}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SucessVerification"
            component={SucessVerification}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FlashScreen"
            component={FlashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="BottomNavigation"
            component={BottomNavigation}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="UpdateInfo"
            component={UpdateInfo}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="NotificationScreen"
            component={NotificationScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SearchProfile"
            component={SearchProfile}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="NearBySearch"
            component={NearBySearch}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="WantToDonate"
            component={WantToDonate}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="EligibilityCheck"
            component={EligibilityCheck}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AboutUsPage"
            component={AboutUsPage}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Otp"
            component={Otp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    // </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
