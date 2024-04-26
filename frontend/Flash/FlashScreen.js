import React, { useRef} from 'react';
import { Animated, ImageBackground, Text, View } from 'react-native';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 4000,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <FadeInView style={{height:'100%', width:'100%', backgroundColor: 'powderblue'}}>
 <ImageBackground style={{height:'100%', width:'100%'}} resizeMode="stretch"  source={require('../assets/images/splash.png')}>
            <Text>Loading</Text>
      </ImageBackground>
    </FadeInView>   
  )
}