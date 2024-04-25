import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const Testing = () => {
  const [location, setLocation] = useState(null);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }


      
      const location = await Location.getCurrentPositionAsync({});
      console.log('get location successfully')
      setLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <View>
          <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}

      <Button title="Location" onPress={getLocationAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Testing;
