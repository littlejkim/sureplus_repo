// public imports
import React, { useRef, useState, useContext, useEffect } from 'react';
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
import { FloatingTextInput } from '../../components/FloatingTextInput';

export default function NameForm({ navigation }) {
  useEffect(() => {
    console.log(localFirst);
  });
  const theme = useTheme();
  const { setFirstname, setLastname } = useContext(SignUpContext);
  const [localFirst, setLocalFirst] = useState(null);
  const [localLast, setLocalLast] = useState(null);
  // focus text inputs
  const [focus, setFocus] = useState(0);
  const lastNameRef = useRef();

  const _showNext = () => {
    lastNameRef.current.focus();
  };

  const _continue = () => {
    setFirstname(localFirst);
    setLastname(localLast);
    setFocus(3);
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
                autoFocus={true}
                label="First Name"
                value={localFirst}
                onChangeText={(value) => setLocalFirst(value)}
              />
            </View>
            <FloatingTextInput
              autoFocus={false}
              label="Last Name"
              value={localLast}
              onChangeText={(value) => setLocalFirst(value)}
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
            onPress={focus === 0 ? _showNext : _continue}
            activeOpacity={0.7}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
