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
import LocationComponent from "./screens/LocationComponent";
import MapScreen from "./screens/MapScreen";
import UpdateInfo from "./screens/UpdateInfo";
import Testing from "./screens/Testing";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setisFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setisFirstLaunch(true);
      } else {
        setisFirstLaunch(false);
      }
    });
  }, []);

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
    // <Testing/>
    // <FlashScreen/>
    // <BottomNavigation/>
    // <MapScreen/>
    // <LocationComponent/>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
