import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import colorValue from '../constants/ColorValue';
import { commonJustify, commonStyle } from '../constants/commonStyle';
import fontValue from '../constants/FontValue';



const NearbyResult = ({ item }) => {
    const navigation = useNavigation();
    const [searchKey, setSearchKey] = useState("");
    const [searchData, setSearchData] = useState("");

    const handleSearch = async () => {
        // Perform API call with the searchKey
        console.log(searchKey);
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_CLIENT_URL}/api/v1/fetch/search?searchItem=${searchKey}`
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


    const handleProfilePress = async () => {
        // console.log(item);
        setSearchKey(item.email)
        // console.log(searchKey)
        if (searchKey) {
            await handleSearch();
            if (searchData) {
                console.log(searchData[0])
                navigation.navigate('SearchProfile', { item: searchData[0] });
            }
        }
    }

    return (
        <TouchableOpacity style={[styles.main, commonJustify.rowSpaceBetween]} onPress={handleProfilePress}>
            <Avatar
                rounded
                size={'medium'}
                icon={{ name: 'user', type: 'font-awesome' }}
                containerStyle={[{ backgroundColor: colorValue.primary }, commonJustify.center]}
            />


            <View style={commonJustify.center}>
                <Text>{item.email}</Text>
                <Text style={commonStyle({ fontSize: 15, fontFamily: fontValue.PoninsBold, color: colorValue.liteDark }).text}>
                    {item.distance / 1000} km away
                </Text>
            </View>

            <Image
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                source={require('../assets/images/img2/BloodGroup.png')}
            />
        </TouchableOpacity>
    );
};

export default NearbyResult;

const styles = StyleSheet.create({
    main: {
        marginVertical: 10,
        backgroundColor: colorValue.white,
        borderRadius: 5,
        marginHorizontal: '5%',
    },
});
