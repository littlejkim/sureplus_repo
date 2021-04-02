// public imports
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import UpArrow from '../../assets/images/up_arrow.svg';

export const formData = [
  {
    title: 'What is your email?',
    description: 'We require an email address for account recovery.',
    placeholder: 'Email',
    keyboardType: 'email-address',
    autoFocus: true,
  },
  {
    title: 'Create username',
    description:
      'Choose a username for your new account. You can always change it later.',
    placeholder: 'Username',
    keyboardType: 'ascii-capable',
    autoFocus: false,
  },
];

export default function CarouselForm() {
  const theme = useTheme();
  const slideRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const [localEmail, setLocalEmail] = useState(null);
  const [localUsername, setLocalUsername] = useState(null);

  const _validateEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(localEmail);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  const _showNext = () => {
    slideRef.current.snapToNext();
  };

  const _showPrev = () => {
    slideRef.current.snapToPrev();
  };

  const renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 24 }}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={[styles.bodyText, { color: theme.colors.title }]}>
        {item.description}
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          placeholder={item.placeholder}
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          style={[
            styles.textInput,
            {
              color: theme.colors.mainText,
              borderBottomColor: PRIMARY_COLOR,
            },
          ]}
          autoCapitalize="none"
          selectionColor={PRIMARY_COLOR}
          autoCompleteType="off"
          autoFocus={item.autoFocus}
          keyboardType={item.keyboardType}
          maxLength={35}
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={(value) => {
            activeSlide === 0 ? setLocalEmail(value) : setLocalUsername(value);
          }}
          onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType="done"
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-20}>
      <View style={styles.container}>
        <View
          style={[
            styles.body,
            {
              paddingHorizontal: 0,
            },
          ]}>
          <Carousel
            data={formData}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderHeight={Dimensions.get('window').height}
            itemHeight={Dimensions.get('window').height}
            vertical={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            ref={slideRef}
            lockScrollWhileSnapping={true}
            keyboardShouldPersistTaps={'always'}
            scrollEnabled={false}
          />
          <View
            style={[
              styles.footer,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}>
            {activeSlide !== 0 ? (
              <TouchableOpacity
                style={styles.previousButton}
                onPress={_showPrev}>
                <UpArrow height={'100%'} />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {true ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={_showNext}
                activeOpacity={0.7}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={[styles.nextButton, { opacity: 0.5 }]}
                onPress={() => console.log('hi')}
                activeOpacity={0.7}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
