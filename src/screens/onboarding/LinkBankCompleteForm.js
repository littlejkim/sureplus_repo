// public imports
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

export default function LinkBankCompleteForm({ navigation }) {
  const theme = useTheme();
  const { institutions } = useContext(SignUpContext);

  const _continue = () => {
    navigation.navigate('Email');
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Link Complete!
        </Text>
        <Text style={styles.bodyText}>
          institution id: {institutions[0].institution_id} {'\n'}
          institution name: {institutions[0].institution_name} {'\n'}
          public token: {institutions[0].publicToken}
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={_continue}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => console.log('pressed home')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            Connect another bank
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
