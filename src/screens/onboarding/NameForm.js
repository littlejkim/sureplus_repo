// public imports
import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import { FloatingTextInput } from '../../components/FloatingTextInput';

export default function NameForm({ navigation }) {
  const theme = useTheme();
  const { setFirstname, setLastname } = useContext(SignUpContext);
  const [localFirst, setLocalFirst] = useState(null);
  const [localLast, setLocalLast] = useState(null);
  const lastNameRef = useRef();

  const _continue = () => {
    setFirstname(localFirst);
    setLastname(localLast);
    navigation.navigate('LinkBank');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-20}>
        <View style={styles.body}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            What is your full legal name?
          </Text>
          <View style={{ marginTop: 40 }}>
            <View style={{ paddingBottom: 30 }}>
              <FloatingTextInput
                textColor={theme.dark}
                label="First Name"
                returnKeyType="next"
                value={localFirst}
                autoFocus={true}
                autoCapitalize="words"
                autoCompleteType="off"
                keyboardType="ascii-capable"
                maxLength={30}
                enablesReturnKeyAutomatically={true}
                onChangeText={(value) => setLocalFirst(value)}
                onSubmitEditing={() => lastNameRef.current.focus()}
              />
            </View>
            <FloatingTextInput
              textColor={theme.dark}
              label="Last Name"
              returnKeyType="done"
              value={localLast}
              autoFocus={false}
              autoCapitalize="words"
              autoCompleteType="off"
              keyboardType="ascii-capable"
              maxLength={30}
              enablesReturnKeyAutomatically={true}
              onChangeText={(value) => setLocalLast(value)}
              onSubmitEditing={() => _continue()}
              inputRef={lastNameRef}
            />
          </View>
        </View>
        <View
          style={[
            styles.footer,
            {
              alignItems: 'flex-end',
              opacity: localFirst && localLast ? 1 : 0.5,
            },
          ]}>
          <TouchableOpacity
            style={styles.nextButton}
            disabled={localFirst && localLast ? false : true}
            onPress={_continue}
            activeOpacity={0.7}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
