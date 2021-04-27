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
  {
    name: 'Disney Plus',
    src: require('../assets/images/subscriptions/disneyplus.png'),
  },
  {
    name: 'Youtube',
    src: require('../assets/images/subscriptions/youtube.png'),
  },
  {
    name: 'Typeform',
    src: require('../assets/images/subscriptions/typeform.png'),
  },
];

export const HomeCarousel = () => {
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.imageViewContainer}>
        <Image
          style={styles.image}
          source={item.src}
          containerStyle={styles.imageContainer}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={180}
        data={carouselData}
        renderItem={renderItem}
        autoplay={true}
        autoplayInterval={2500}
        loop={true}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.85}
        firstItem={2}
        scrollEnabled={false}
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
  imageViewContainer: {
    elevation: 5, // shadow on Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    aspectRatio: 0.35,
    resizeMode: 'contain',
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  },
});
