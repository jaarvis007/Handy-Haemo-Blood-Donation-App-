import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Mapscreen = () => {
  // Coordinates for the marker
  const markerCoordinates = { latitude: 37.78825, longitude: -122.4324 };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker with a custom callout */}
        <Marker
          coordinate={markerCoordinates}
          title="Marker Title"
          description="This is the marker description"
          // Custom marker image (optional)
          // image={require('./path/to/custom_marker.png')}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Mapscreen;
