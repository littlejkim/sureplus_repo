// public imports
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { PRIMARY_COLOR } from '../../styles/constants';

export default function PhoneTempForm({ navigation }) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { setPhone } = useContext(SignUpContext);
  const [localPhone, setLocalPhone] = useState(null);

  const _continue = () => {
    setPhone(localPhone);
    setIsLoading(true);
    navigation.navigate('Name');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-20}>
      <View style={styles.container}>
        <View style={[styles.body, { width: '100%' }]}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            What is your phone number?
          </Text>
          <View style={{ marginTop: 40 }}>
            <TextInput
              placeholder="Phone number"
              keyboardAppearance={theme.dark ? 'dark' : 'light'}
              style={[
                styles.textInput,
                {
                  color: theme.colors.mainText,
                  borderBottomColor: theme.dark ? PRIMARY_COLOR : '#F1F2F4',
                },
              ]}
              autoCapitalize="none"
              selectionColor={theme.dark ? 'white' : PRIMARY_COLOR}
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              maxLength={35}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
              onChangeText={(value) => setLocalPhone(value)}
              onSubmitEditing={_continue}
              returnKeyType="next"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {true ? (
              <TouchableOpacity
                style={styles.roundButton}
                onPress={_continue}
                activeOpacity={0.7}>
                <Image
                  source={require('../../assets/images/next_arrow.png')}
                  style={{ resizeMode: 'contain', aspectRatio: 0.5 }}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={[styles.roundButton, { opacity: 0.5 }]}
                onPress={_continue}
                activeOpacity={0.7}>
                <Image
                  source={require('../../assets/images/next_arrow.png')}
                  style={{ resizeMode: 'contain', aspectRatio: 0.5 }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
