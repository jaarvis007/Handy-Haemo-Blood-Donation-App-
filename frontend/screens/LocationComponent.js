// import React, { useEffect, useState } from 'react';
// import { Text, Button } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// const LocationComponent = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     // Check for location permissions before accessing location
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       },
//       error => {
//         console.log('Error getting location:', error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   }, []);

//   return (
//     <>
//       {location ? (
//         <Text>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text>No location available</Text>
//       )}
//       <Button title="Get Location" onPress={() => getLocation()} />
//     </>
//   );
// };

// export default LocationComponent;
