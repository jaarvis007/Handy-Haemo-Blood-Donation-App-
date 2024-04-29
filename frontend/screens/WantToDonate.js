import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import { images, COLORS, FONTS, SIZES } from "../constants";
import { useNavigation } from '@react-navigation/native';



export default function WantToDonate() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userDetail,setUserDetail]=useState(null);

  useEffect(() => {

    AsyncStorage.getItem("user").then((data) => {
      setUserDetail(JSON.parse(data));
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []);

  const handleSubmit = async (locationData) => {
  try {
    
    if(locationData==null || userDetail==null){
        Alert.alert("Field not present");
        return;
    }

    const dataToSend = {
      coords:location.coords,
      mocked:location.mocked,
      timestamp:location.timestamp,
      email:userDetail.email, // Example email
      visible: true // Example visibility status
    };

    const response = await fetch('http://172.31.93.14:8080/api/v1/location/update-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error('Failed to save location data');
    }
    Alert.alert('Location data saved successfully')
    console.log('Location data saved successfully');
  } catch (error) {
    Alert.alert(error.message)
    console.error(error.message);
  }
};

  const navigation=useNavigation()
  return (
    // <Text>{JSON.parse(location)}</Text>


        <SafeAreaView style={{ flex: 1 }}>
         <PageContainer>
        <ScrollView>
          <View
            style={{
              flex: 1,
              marginTop:25,
              marginHorizontal: 25,
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
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Want</Text>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.black,
                  marginHorizontal: 8,
                }}
              >
                To 
              </Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Donate</Text>
            </View>

            </View>

            {/* button */}

             {location==null?(<Text>Waiting</Text>):errorMsg!==null?<Text>{errorMsg}</Text>:<Text style={styles.paragraph}>{JSON.stringify(location)}</Text>}
        <Button
        onPress={()=>{handleSubmit(location)}}
        filled
        title='On Location'
        ></Button>

        <Button
        // onPress={()=>{handleSubmit(location)}}
        title='Off Location'
        ></Button>

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
                 Back To Home
                </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
