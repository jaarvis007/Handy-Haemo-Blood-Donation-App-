import React from "react";
import { Text, Dimensions, StyleSheet, View, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { images, COLORS, FONTS, SIZES } from ".."; // Assuming you have imported your images correctly
const image1 = require("../../assets/images/slider/slider5.webp");
const image2 = require("../../assets/images/slider/slider2.jpg");
const image3 = require("../../assets/images/slider/slider3.jpg");
const image4 = require("../../assets/images/slider/slider4.jpg");

const Slider = () => (
  <View style={styles.main}>
    <View style={styles.container}>
      <SwiperFlatList
        paginationStyleItem={{ width: 10, height: 10 }}
        paginationActiveColor={COLORS.primary}
        paginationDefaultColor="gray"
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
      >
        <View style={[styles.child, { backgroundColor: "transparent" }]}>
          <Image source={image1} style={styles.image} />
        </View>
        <View style={[styles.child, { backgroundColor: "transparent" }]}>
          <Image source={image2} style={styles.image} />
        </View>
        <View style={[styles.child, { backgroundColor: "transparent" }]}>
          <Image source={image3} style={styles.image} />
        </View>
        <View style={[styles.child, { backgroundColor: "transparent" }]}>
          <Image source={image4} style={styles.image} />
        </View>
      </SwiperFlatList>
    </View>
  </View>
);

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  main: { height: height * 0.2, width: width, borderRadius: 20 },
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "center" },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
});

export default Slider;
