import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import colorValue from '../ColorValue';
import { commonStyle } from '../commonStyle';
import fontValue from '../FontValue';
import { ItemArray } from './Data';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



const Body = () => {
  const navigation = useNavigation();

  const handleOpt = (e) => {
    console.log(e);
    if (e === 1) navigation.navigate("NearBySearch")
    if (e === 2) navigation.navigate("WantToDonate")
    if (e === 4) navigation.navigate("EligibilityCheck")

  }
  return (
    <FlatList
      data={ItemArray}
      numColumns={3}
      renderItem={({ item }) =>
        <GestureHandlerRootView>
          <TouchableOpacity
            onPress={() => handleOpt(item.id)}
          >
            <Card item={item} />
          </TouchableOpacity>
        </GestureHandlerRootView>
      }
    />
  );
};

export default Body;

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.subCard}>
        <View style={styles.body}>
          <Image
            style={{ width: '60%', height: '60%', resizeMode: 'contain' }}
            source={item.image}
          />
          <Text
            style={
              commonStyle({ fontSize: 13 }).text
            }>
            {item.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.333,
    height: 100,
    marginBottom: 10,
  },
  subCard: {
    margin: 10,
    backgroundColor: colorValue.white,
    height: '100%',
  },
  body: {
    alignItems: 'center',
    marginTop: '20%',
  },
});