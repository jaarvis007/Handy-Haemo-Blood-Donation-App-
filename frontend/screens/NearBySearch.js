import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,FlatList,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function NearBySearch() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
    })();
  }, []);

  return (
    <View>
      <MapView
    style={{width:'100%',height:'100%'}}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
    </View>
    
    
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

// const NearbySearchScreen = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);

//   useEffect(() => {
//     // Get user's current location
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetchNearbyPlaces(latitude, longitude);
//       },
//       (error) => console.error(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   }, []);

//   const fetchNearbyPlaces = async (latitude, longitude) => {
//     try {
//       // Call your backend service or third-party API to get nearby places
//       // Example: const response = await fetch(`YOUR_API_URL?lat=${latitude}&lng=${longitude}`);
//       // const data = await response.json();
//       // setNearbyPlaces(data);
//       // setIsLoading(false);
      
//       // Simulated data for demonstration
//       const simulatedData = [
//         { id: '1', name: 'Place 1', distance: '0.3 miles' },
//         { id: '2', name: 'Place 2', distance: '0.5 miles' },
//         { id: '3', name: 'Place 3', distance: '0.8 miles' },
//       ];
//       setNearbyPlaces(simulatedData);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching nearby places:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={nearbyPlaces}
//           renderItem={({ item }) => (
//             <View style={{ padding: 10 }}>
//               <Text>{item.name}</Text>
//               <Text>{item.distance}</Text>
//             </View>
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       )}
//     </View>
//   );
// };

// export default NearbySearchScreen;


