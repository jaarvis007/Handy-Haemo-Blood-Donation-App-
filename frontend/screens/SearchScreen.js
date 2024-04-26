import { View, Text, Dimensions, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
// import { SearchBar } from 'react-native-elements'
import { commonJustify } from "../constants/commonStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import MapView from "react-native-maps";
// import { searchData } from '../constants/Home/Data'
import SearchComponent from "./SeachComponent";
import colorValue from "../constants/ColorValue";
import { Searchbar } from "react-native-paper";

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useState("");

  const handleSearch = async () => {
    // Perform API call with the searchKey
    console.log(searchKey);
    try {
      const response = await fetch(
        `http://172.29.56.89:8080/api/v1/fetch/search?searchItem=${searchKey}`
      ); // Replace with your API endpoint
      if (!response.ok) {
        console.warn("Error in response");
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      if (jsonData.data.length === 0) {
        Alert.alert("No Data Found");
      }
      setSearchData(jsonData.data); // Update state with fetched data
      // consle.log(donationdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(searchData);

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {/* <SearchBar
      placeholder='Enter Username To Search'
      onChangeText={text=>setSearchKey(text)}
      value={searchKey}

      onSubmitEditing={handleSearch}
      
      containerStyle={{
        backgroundColor:colorValue.white,
        borderTopWidth:0,
        borderBottomWidth:0,
        width:windowWidth*0.8,
      }}
      inputStyle={{
        backgroundColor:colorValue.white,
      }}
      leftIconContainerStyle={{
        backgroundColor:colorValue.primary 
      }}
      /> */}
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchKey(text)}
          value={searchKey}
          onSubmitEditing={handleSearch}
          // onClearIconPress={setSearchKey()}
        />
      </View>

      {searchData.size == 0 ? (
        <Text>"No Data Found"</Text>
      ) : (
        <FlatList
          data={searchData}
          renderItem={({ item }) => <SearchComponent item={item} />}
        />
      )}
    </View>
  );
};

export default SearchScreen;
