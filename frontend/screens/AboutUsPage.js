import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colorValue from "../constants/ColorValue";

const AboutUsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Our Project</Text>
      <Text style={styles.description}>
        Our project will harness the power of geolocation technology to identify
        and connect potential blood donors in real-time. Through a user-friendly
        interface, users can register their availability and blood type.
        Recipient can search for suitable donors based on their location and
        blood type requirements.
      </Text>

      <Text style={styles.heading}>Meet Our Team</Text>

      {/* Profile 1 */}
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/pixy2.jpeg")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Aman Jain</Text>
          <Text style={styles.profileDescription}>2022CA009</Text>
          {/* <Text>- 5 years of experience in React Native development</Text>
          <Text>- Expertise in backend technologies</Text> */}
        </View>
      </View>

      {/* Profile 2 */}
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/pixy3.jpeg")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Aadersh Chaubey</Text>
          <Text style={styles.profileDescription}>2022CA001</Text>
          {/* <Text>- Award-winning designer with 8 years of experience</Text>
          <Text>- Proficient in Adobe Creative Suite</Text> */}
        </View>
      </View>

      {/* Profile 3 */}
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/pixy1.jpg")}
          style={styles.profileImage}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Gopal Ranjan</Text>
          <Text style={styles.profileDescription}>2022CA033</Text>
          {/* <Text>- Certified Scrum Master</Text>
          <Text>- Strong leadership and communication skills</Text> */}
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
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFF", // White color for text
  },
  description: {
    marginBottom: 20,
    color: "#FFF", // White color for text
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF", // White color for text
  },
  profileDescription: {
    fontStyle: "italic",
    marginBottom: 5,
    color: "#FFF", // White color for text
  },
  profileInfo: {
    flex: 1,
  },
});

export default AboutUsPage;
