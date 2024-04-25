import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import colorValue from '../constants/ColorValue';
import { commonJustify, commonStyle } from '../constants/commonStyle';
import fontValue from '../constants/FontValue';

const SearchComponent = ({ item }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    // Navigate to SearchProfile screen and pass 'item' as parameter
    // console.log(item);
    navigation.navigate('SearchProfile', { item });
  };

  return (
    <TouchableOpacity style={[styles.main, commonJustify.rowSpaceBetween]} onPress={handleProfilePress}>
      <Avatar
        rounded
        size={'medium'}
        icon={{ name: 'user', type: 'font-awesome' }}
        containerStyle={[{ backgroundColor: colorValue.primary }, commonJustify.center]}
      />

      <View style={commonJustify.center}>
        <Text>{item.name}</Text>
        <Text style={commonStyle({ fontSize: 11, fontFamily: fontValue.PoninsBold, color: colorValue.liteDark }).text}>
          {item.location}
        </Text>
      </View>

      <Image
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
        source={require('../assets/images/img2/BloodGroup.png')}
      />
    </TouchableOpacity>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    backgroundColor: colorValue.white,
    borderRadius: 5,
    marginHorizontal: '5%',
  },
});
