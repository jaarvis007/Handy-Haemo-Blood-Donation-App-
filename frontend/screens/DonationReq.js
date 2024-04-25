import {FlatList, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { donationRequest } from "../constants/Home/Data";
import DonationReqCard from '../constants/Home/DonationReqCard';

const DonationReq = () => {

  
  return (
    // <ScrollView>

        <View style={{width: '100%', height: '100%'}}>
          <FlatList
            data={donationRequest}
            renderItem={({item}) => <DonationReqCard item={item} />}
          />
        </View>
    // </ScrollView>
  )
}

export default DonationReq