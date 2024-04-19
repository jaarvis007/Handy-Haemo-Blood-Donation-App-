import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const Testing = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Request permission and get current location when component mounts
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
    })();
  }, []); // empty dependency array means this effect runs only once after initial render

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Get Current Location</Text>
      {errorMsg ? (
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      ) : (
        location && (
          <View>
            <Text style={styles.locationText}>
              Latitude: {location.coords.latitude}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {location.coords.longitude}
            </Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorMsg: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default Testing;
