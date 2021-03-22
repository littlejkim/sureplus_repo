// public imports
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart'; // temporary restart module (might need to replace during production level)
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';

import { storeUserToken } from '../../utils/userUtils';
import { testUserData } from '../../data/testUserData';

export default function CompleteForm({ navigation }) {
  const context = useContext(SignUpContext);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.body}>
        <Image
          style={{
            aspectRatio: 2.5,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/logo_long.png')}
        />
        <Text style={[styles.body, { color: 'white' }]}>
          firstname: {context.firstname} {'\n'}
          lastname: {context.lastname} {'\n'}
          email: {context.email}
          {'\n'}
          username: {context.username}
          {'\n'}
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: 'white' }]}
          onPress={() => console.log('hi')}
          activeOpacity={0.7}>
          <Text style={[styles.mainButtonText, { color: colors.primary }]}>
            Link Bank
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => storeUserToken(testUserData).then(RNRestart.Restart())}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: 'white' }]}>
            Go to home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
