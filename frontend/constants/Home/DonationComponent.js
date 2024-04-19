import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import colorValue from '../ColorValue'
import { commonJustify, commonStyle } from '../commonStyle'
import fontValue from '../FontValue' 

const DonationComponent = ({item}) => {
    
    return (
        <View style={[styles.main, commonJustify.rowSpaceBetween]}>    
           <View>
           <View style={[styles.margin]}>
            <Text style={commonStyle({fontSize:13}).text}>Name</Text>
            <Text style={commonStyle({fontSize:14,color:colorValue.liteDark2}).text}>{item.name}</Text>
            </View>

            <View style={[styles.margin]}>
            <Text style={commonStyle({fontSize:13}).text}>Location</Text>
            <Text style={commonStyle({fontSize:14 ,color:colorValue.liteDark2}).text}>{item.location}</Text>
            </View>
            
            <View style={[styles.margin]}>
            <Text style={commonStyle({fontSize:13}).text}>Phone</Text>
            <Text style={commonStyle({fontSize:13}).text} >{item.phone}</Text>
            </View>
           </View>

           <View  style={{paddingTop:30}} >
               <Image style={{width:100}} resizeMode="contain" source={require("../../assets/images/img2/BloodGroup.png")}/>
               <Button titleStyle={{color:colorValue.primary}} type="clear" title="Donate" />
           </View>
        </View>
    )
}

export default DonationComponent

const styles = StyleSheet.create({
    main:{
        backgroundColor:'white',
        marginTop:10
    },
    margin:{
        marginLeft:10, 
        padding:5
    }
})