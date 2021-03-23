// public imports
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

// custom imports
import styles from '../styles/password.styles';

export default function PasswordScreen() {
  const [count, setCount] = useState(0);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const _renderItem = ({ item }) => (
    <View>
      <Text style={{ color: 'white' }}>item</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>
          Welcome back Jinjae! {'\n'}Please enter your password.
        </Text>
        <Text style={styles.bodyText}>4 numeric digits</Text>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '50%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: count >= 1 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: count >= 2 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: count >= 3 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: count >= 4 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ color: 'white' }}>hi</Text>
      </View>
    </View>
  );
}
