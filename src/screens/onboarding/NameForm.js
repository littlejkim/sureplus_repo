// public imports
import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
  Keyboard,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { PRIMARY_COLOR } from '../../styles/constants';

export default function NameForm({ navigation }) {
  const theme = useTheme();
  const { setFirstname, setLastname } = useContext(SignUpContext);
  const [localFirst, setLocalFirst] = useState(null);
  const [localLast, setLocalLast] = useState(null);
  // focus text inputs
  const [showLast, setShowLast] = useState(false);
  const [focus, setFocus] = useState(0);
  const lastNameRef = useRef();

  const _showNext = async () => {
    await setShowLast(true);
    lastNameRef.current.focus();
  };

  const _continue = () => {
    setFirstname(localFirst);
    setLastname(localLast);
    Keyboard.dismiss();
    setFocus(3);
    navigation.navigate('LinkBank');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-20}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            What is your full legal name?
          </Text>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              placeholder="First Name"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  color: theme.colors.mainText,
                  borderBottomColor: focus === 0 ? PRIMARY_COLOR : '#F1F2F4',
                },
              ]}
              autoCapitalize="words"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="ascii-capable"
              textContentType="givenName"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
              onChangeText={(value) => setLocalFirst(value)}
              onSubmitEditing={_showNext}
              onFocus={() => setFocus(0)}
              returnKeyType="next"
            />
          </View>
          <View
            style={{
              marginTop: 16,
              width: showLast ? '100%' : 0,
              height: showLast ? '100%' : 0,
            }}>
            <Text style={styles.labelText}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  color: theme.colors.mainText,
                  borderBottomColor: focus === 1 ? PRIMARY_COLOR : '#F1F2F4',
                },
              ]}
              autoCapitalize="words"
              selectionColor={PRIMARY_COLOR}
              autoCompleteType="off"
              keyboardType="ascii-capable"
              textContentType="givenName"
              maxLength={35}
              autoCorrect={false}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              onFocus={() => setFocus(1)}
              onChangeText={(value) => setLocalLast(value)}
              onSubmitEditing={_continue}
              ref={lastNameRef}
              returnKeyType="next"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {localFirst && localLast ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={_continue}
                activeOpacity={0.7}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <View>
                {showLast || !localFirst ? (
                  <View
                    style={[styles.nextButton, { opacity: 0.5 }]}
                    onPress={_continue}
                    activeOpacity={0.7}>
                    <Text style={styles.nextButtonText}>Next</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={_showNext}
                    activeOpacity={0.7}>
                    <Text style={styles.nextButtonText}>Next</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
