// public imports
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

// custom imports
import styles from '../styles/password.styles';

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [count, setCount] = useState(0);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, 'DEL'];

  const _checkPassword = async (item) => {
    password === '1234'
      ? console.log('password matches')
      : console.log('password missmatch');
  };
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
              opacity: password.length >= 1 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: password.length >= 2 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: password.length >= 3 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 100,
              opacity: password.length >= 4 ? 1 : 0.3,
              backgroundColor: 'white',
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={numbers}
          renderItem={({ item, index }) =>
            index === 9 ? (
              <View style={styles.item} />
            ) : index === 11 ? (
              <TouchableOpacity
                style={styles.item}
                onPress={() => setPassword(password.slice(0, -1))}>
                <Image
                  source={require('../assets/images/delete.png')}
                  style={{ aspectRatio: 0.3, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  password.length < 4
                    ? setPassword(password + item.toString())
                    : _checkPassword()
                }>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item) => item.toString()}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}
