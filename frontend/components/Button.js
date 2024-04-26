import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outLinedBgColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outLinedBgColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          ...FONTS.body2,
          ...{ color: textColor },
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    boderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
