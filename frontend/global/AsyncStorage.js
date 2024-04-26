import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// get items
// get items
const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    // console.log(jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data stored successfully`);
  } catch (error) {
    console.error(`Error storing data with key ${key}:`, error);
  }
};

// Function to get data from AsyncStorage
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data with key ${key}:`, error);
    return null;
  }
};


// remove items
// remove items
// remove items
export const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export {setData,getData}
