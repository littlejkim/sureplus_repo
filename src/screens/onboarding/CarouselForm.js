// public imports
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { PRIMARY_COLOR, ERROR_COLOR } from '../../styles/constants';
import UpArrow from '../../assets/images/up_arrow.svg';
import EmailForm from './EmailForm';

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
  const [localEmail, setLocalEmail] = useState(null);
  const [localUsername, setLocalUsername] = useState(null);

  const [formHeight, setFormHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const animatedHeight = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  useEffect(() => {
    Animated.spring(animatedHeight, {
      friction: 100,
      toValue: expanded ? 0 : formHeight,
      useNativeDriver: false,
    }).start();
  }, [expanded, animatedHeight, formHeight]);

  const _showNext = () => {
    Keyboard.dismiss();
    setExpanded(true);
  };

  const _showPrev = () => {
    setExpanded(false);
  };

  const _renderItem = ({ item }) => (
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
          onChangeText={(value) => {}}
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
      <View
        style={styles.container}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          console.log(height);
          setFormHeight(height);
        }}>
        <View
          style={[
            styles.body,
            {
              paddingHorizontal: 0,
            },
          ]}>
          <Animated.View
            style={{
              height: animatedHeight,
              paddingHorizontal: 24,
            }}>
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
                    borderBottomColor: PRIMARY_COLOR,
                    height: !expanded ? 40 : 0,
                    fontSize: !expanded ? 25 : 0,
                    borderBottomWidth: !expanded ? 2 : 0,
                    paddingVertical: !expanded ? 4 : 0,
                  },
                ]}
                autoCapitalize="none"
                selectionColor={PRIMARY_COLOR}
                autoCompleteType="off"
                keyboardType="email-address"
                textContentType="emailAddress"
                maxLength={35}
                autoCorrect={false}
                autoFocus={true}
                clearButtonMode="while-editing"
                enablesReturnKeyAutomatically={true}
                onChangeText={(value) => {}}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="done"
              />
            </View>
          </Animated.View>
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={[styles.titleText, { color: theme.colors.title }]}>
              What is your username?
            </Text>
            <View style={{ marginTop: 40 }}>
              <TextInput
                placeholder="Email"
                keyboardAppearance={theme.dark ? 'dark' : 'light'}
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.mainText,
                    borderBottomColor: PRIMARY_COLOR,
                    height: expanded ? 40 : 0,
                    fontSize: expanded ? 25 : 0,
                    borderBottomWidth: expanded ? 2 : 0,
                    paddingVertical: expanded ? 4 : 0,
                  },
                ]}
                autoCapitalize="none"
                selectionColor={PRIMARY_COLOR}
                autoCompleteType="off"
                keyboardType="email-address"
                textContentType="emailAddress"
                maxLength={35}
                autoCorrect={false}
                autoFocus={false}
                clearButtonMode="while-editing"
                enablesReturnKeyAutomatically={true}
                onChangeText={(value) => {}}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="done"
              />
            </View>
          </View>

          <View
            style={[
              styles.footer,
              {
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                bottom: 0,
                position: 'absolute',
              },
            ]}>
            {true ? (
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
