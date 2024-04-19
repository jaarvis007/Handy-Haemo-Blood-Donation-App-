import { View, Text } from 'react-native'
import React from 'react'

const UpdateInfo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            flex: 1,
            marginHorizontal: 22,
            alignItems: "center",
          }}
        >

          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Update</Text>
            <Text
              style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}
            >
             Your
            </Text>
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Info</Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Input
              icon="email"
              iconPack={MaterialIcons}
              id="email"
              placeholder="Enter your Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              value={email}
            />

            <Input
              icon="lock"
              iconPack={FontAwesome}
              id="password"
              autoCapitalize="none"
              placeholder="Enter your Password"
              secureTextEntry
              onChangeText={password => setPassword(password)}
              value={password}
            />
          </View>

          <Button
            title={"Update"}
            filled
            // onPress={() => navigation.navigate("Home")}
            onPress={handleSubmit}
            style={{
              width: "100%",
            }}
          />



          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
            }}
          >
            

            
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  )
}

export default UpdateInfo