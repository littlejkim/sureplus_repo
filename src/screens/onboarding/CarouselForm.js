import React, { useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useTheme } from '@react-navigation/native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);
import styles from '../../styles/welcome.styles';

const testData = ['blue', 'black', 'pink', 'red'];

export default function CarouselForm() {
  const theme = useTheme();

  const _renderItem = ({ item, index }) => {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-20}>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={[styles.titleText, { color: theme.colors.title }]}>
              What is your email?
            </Text>
            <View style={{ marginTop: 40 }}>
              <TextInput
                placeholder="Email"
                keyboardAppearance={theme.dark ? 'dark' : 'light'}
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.mainText,
                  },
                ]}
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType="email-address"
                textContentType="emailAddress"
                maxLength={35}
                autoCorrect={false}
                clearButtonMode="while-editing"
                enablesReturnKeyAutomatically={true}
                blurOnSubmit={true}
                onChangeText={(value) => {}}
                onSubmitEditing={() => console.log('hi')}
                returnKeyType="done"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <Carousel
      data={testData}
      renderItem={_renderItem}
      sliderHeight={viewportHeight}
      itemHeight={viewportHeight}
      vertical={true}
      slideStyle={{ width: viewportWidth }}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
    />
  );
}
