// public imports
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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

  //  <Text style={styles.bodyText}>
  //    institution id: {institutions[0].institution_id} {'\n'}
  //    institution name: {institutions[0].institution_name} {'\n'}
  //    public token: {institutions[0].publicToken}
  //  </Text>;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Link Complete!
        </Text>
        <View
          style={[
            styles.linkedBankContainer,
            { backgroundColor: theme.colors.background },
          ]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/bankofamerica_icon.png')}
              style={{ height: 40, width: 40, marginRight: 20 }}
            />
            <Text
              style={[styles.linkedBankText, { color: theme.colors.mainText }]}
              numberOfLines={1}>
              {institutions[0].institution_name}
            </Text>
          </View>
          <View>
            <Image
              source={require('../../assets/images/linked_icon.png')}
              style={{ height: 36, width: 36 }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.subscriptionsFoundText,
              { color: theme.colors.mainText },
            ]}>
            We found 14 subscriptions
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => console.log('pressed home')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            Connect another bank
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={_continue}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
