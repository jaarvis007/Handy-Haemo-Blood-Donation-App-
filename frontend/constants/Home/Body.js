import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
} from "react-native";
import colorValue from "../ColorValue";
import { commonStyle } from "../commonStyle";
import fontValue from "../FontValue";
import { ItemArray } from "./Data";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Body = () => {
  const navigation = useNavigation();

  const handleOpt = (e) => {
    console.log(e);
    if (e === 1) navigation.navigate("NearBySearch");
    if (e === 2) navigation.navigate("WantToDonate");
    if (e === 5) navigation.navigate("EligibilityCheck");
    if (e === 6) navigation.navigate("AboutUsPage");
  };

  // Function to render each item
  const renderCard = ({ item }) => (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={() => handleOpt(item.id)}>
        <Card item={item} />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );

  return (
    <FlatList
      data={ItemArray}
      numColumns={2} // Display two items per row
      renderItem={renderCard}
      keyExtractor={(item) => item.id.toString()} // Ensure unique keys
      contentContainerStyle={styles.flatListContainer} // Added container style
    />
  );
};

export default Body;

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.subCard}>
        <View style={styles.body}>
          <Image style={styles.image} source={item.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10, // Added horizontal padding
    paddingTop: 10, // Added top padding
  },
  card: {
    width: width * 0.46, // Adjusted width for two items per row
    aspectRatio: 2, // Added aspect ratio for square layout
    margin: 7, // Adjusted margin
  },
  subCard: {
    flex: 1,
    backgroundColor: colorValue.white,
    borderRadius: 7, // Added border radius for rounded corners
    overflow: "hidden", // Added overflow to prevent content overflow
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  title: {
    ...commonStyle({ fontSize: 13 }).text,
    marginTop: 10, // Added margin for separation
  },
});
