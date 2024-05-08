import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { commonJustify } from '../constants/commonStyle';
import { Button, Slider } from 'react-native-elements';
import colorValue from '../constants/ColorValue';
import { images, COLORS, FONTS, SIZES } from "../constants";

import SearchComponent from './SeachComponent';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import NearbyResult from './NearbyResult';

export default function NearBySearch() {
  const [currlocation, setcurrLocation] = useState(null);
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  const [nearbyLocation, setnearByLocation] = useState(null);
  const [isList, setisList] = useState("false");
  const [range, setRange] = useState(50);
  const [data, setData] = useState(10);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // if (nearbyLocation === null) setisList(false)

      let location = await Location.getCurrentPositionAsync({});
      setcurrLocation(location);
      console.log(location);
      setlat(location.coords.latitude);
      setlong(location.coords.longitude)
      fetchData();
    })();

    // const intervalId = setInterval(fetchData, 2000);
    // return () => clearInterval(intervalId);

  }, [isList, range]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/location/nearest?latitude=${lat}&longitude=${long}&range=${range * 1000}`
      ); // Replace with your API endpoint

      if (!response.ok) {
        console.warn("Error in response");
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setnearByLocation(jsonData); // Update state with fetched data
      jsonData.map(obj => {
        console.log(obj.name);
      })
      // console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const recenterMap = () => {
    if (currlocation) {
      webViewRef.current.injectJavaScript(`
        map.setView([${currlocation.coords.latitude},${currlocation.coords.longitude}], 15);
      `);
    }
  };

  const webViewRef = React.useRef(null);


  if (isList === true) {
    return (
      <GestureHandlerRootView>
        <View>
          <View
            style={{
              // position: 'absolute',
              marginTop: 20,
              marginBottom: 30,
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Near</Text>
            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.black,
                marginHorizontal: 8,
              }}
            >
              By
            </Text>
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Users</Text>
          </View>

          {nearbyLocation === undefined ? (
            <Text>"No Data Found"</Text>
          ) : (
            <FlatList
              data={nearbyLocation}
              renderItem={({ item }) => <NearbyResult item={item} />}
            />
          )}
        </View>
        <Button
          title={'Swich to MapView'}
          buttonStyle={styles.switchListButton}
          onPress={() => setisList(!isList)}
        />
      </GestureHandlerRootView>


    )
  }

  //mapView..
  return (
    <View style={styles.container}>
      {currlocation ? (
        <>
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{
              html: `<html>
                  <head>
                      <meta charset="utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <style>html, body { margin: 0; padding: 0; }</style>
                  </head>
                  <body>
                      <div id="map" style="width: 100%; height: 100%;"></div>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
                      <script>
                          var map = L.map('map').setView([${currlocation.coords.latitude},${currlocation.coords.longitude}], ${15.357-0.0357*range});
                          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          }).addTo(map);

                           L.marker([${currlocation.coords.latitude}, ${currlocation.coords.longitude}]).addTo(map).bindPopup('You');
                           
                           var nearbyMarkers = ${JSON.stringify(nearbyLocation)}.map(obj => {
                              return L.marker([obj.coords.latitude, obj.coords.longitude]).addTo(map).bindPopup(obj.name+" "+obj.distance/1000+" "+ 'km away');
                            });

                      </script>
                  </body>
              </html>`
            }}
            style={styles.map}
          />


          {/* <Slider */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Range: {range} km</Text>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={150}
              step={5}
              value={range}
              onValueChange={setRange}
            />
          </View>

          <View style={styles.buttonCont}>
            <TouchableOpacity style={styles.button} onPress={recenterMap}>
              <Text style={styles.buttonText}>Recenter</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={recenterMap}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={recenterMap}>
              <Text style={styles.buttonText}>SetRange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={recenterMap}>
              <Text style={styles.buttonText}>ListView</Text>
            </TouchableOpacity> */}
          </View>
          <Button
            title={'Swich to ListView'}
            buttonStyle={styles.switchMapButton}
            onPress={() => setisList(!isList)}
          />
        </>
      ) : (<><ActivityIndicator /></>)}
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  switchMapButton: {
    backgroundColor: colorValue.primary,
  },
  switchListButton: {
    backgroundColor: colorValue.primary,
    // position: 'absolute',

  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button2: {
    position: 'absolute',
    bottom: 120,
    right: 100,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  sliderContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slider: {
    width: '70%',
  },
});
