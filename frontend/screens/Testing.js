import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colorValue from '../constants/ColorValue';

const Testing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Our Project</Text>
      <Text style={styles.description}>
        Our project aims to [brief description of the project].
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </Text>

      <Text style={styles.heading}>Meet Our Team</Text>

      {/* Profile 1 */}
      <View style={styles.profile}>
        <Image source={require('../assets/images/hero.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileDescription}>Lead Developer</Text>
          <Text>- 5 years of experience in React Native development</Text>
          <Text>- Expertise in backend technologies</Text>
        </View>
      </View>

      {/* Profile 2 */}
      <View style={styles.profile}>
        <Image source={require('../assets/images/hero.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Jane Smith</Text>
          <Text style={styles.profileDescription}>UI/UX Designer</Text>
          <Text>- Award-winning designer with 8 years of experience</Text>
          <Text>- Proficient in Adobe Creative Suite</Text>
        </View>
      </View>

      {/* Profile 3 */}
      <View style={styles.profile}>
        <Image source={require('../assets/images/hero.png')} style={styles.profileImage} />

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Mike Johnson</Text>
          <Text style={styles.profileDescription}>Project Manager</Text>
          <Text>- Certified Scrum Master</Text>
          <Text>- Strong leadership and communication skills</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colorValue.primary, // Red theme color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF', // White color for text
  },
  description: {
    marginBottom: 20,
    color: '#FFF', // White color for text
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF', // White color for text
  },
  profileDescription: {
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#FFF', // White color for text
  },
  profileInfo: {
    flex: 1,
  },
});

export default Testing;
