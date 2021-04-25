// public imports
import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet, Platform, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const carouselData = [
  {
    name: 'Netflix',
    src: require('../assets/images/subscriptions/netflix.png'),
  },
  {
    name: 'Adobe',
    src: require('../assets/images/subscriptions/adobe.png'),
  },
  {
    name: 'Spotify',
    src: require('../assets/images/subscriptions/spotify.png'),
  },
  {
    name: 'Masterclass',
    src: require('../assets/images/subscriptions/masterclass.png'),
  },
];

export const HomeCarousel = () => {
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }, parallaxProps) => {
    return <Image source={item.src} containerStyle={styles.imageContainer} />;
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={175}
        data={carouselData}
        renderItem={renderItem}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.85}
        firstItem={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  },
});
