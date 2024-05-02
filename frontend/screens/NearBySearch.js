import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

export default function NearBySearch() {
  const [currlocation, setcurrLocation] = useState(null);
  const [nearbyLocation, setnearByLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setcurrLocation(location);
      console.log(location);
    })();

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://172.31.93.14:8080/api/v1/location/getLocations"
      ); // Replace with your API endpoint
      if (!response.ok) {
        console.warn("Error in response");
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setnearByLocation(jsonData.data); // Update state with fetched data
      console.log(nearbyLocation[0].email);
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
                              var map = L.map('map').setView([${currlocation.coords.latitude},${currlocation.coords.longitude}], 15);
                              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              }).addTo(map);
                              
                               L.marker([${currlocation.coords.latitude}, ${currlocation.coords.longitude}]).addTo(map).bindPopup('You');
                              // Add markers
                             var nearbyLocations = ${JSON.stringify(nearbyLocation)};
                              nearbyLocations.forEach(function(
                                  L.marker([location.latitude, location.longitude]).addTo(map).bindPopup(location.name);
                              });
                          </script>
                      </body>
                  </html>`
            }}
            style={styles.map}
          />
          <TouchableOpacity style={styles.button} onPress={recenterMap}>
            <Text style={styles.buttonText}>Recenter</Text>
          </TouchableOpacity>
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
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  }
});
