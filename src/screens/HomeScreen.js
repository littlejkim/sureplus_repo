// public imports
import React, { useRef } from 'react';
import { View, Button, Image, TouchableOpacity, Text } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

// custom imports
import styles from '../styles/home.styles';
import { deleteUserToken } from '../utils/userUtils';
import { BottomModal } from '../components/BottomModal';

export default function HomeScreen({ navigation }) {
  // menu modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // signout button (for testing)
  const onSignOut = () => {
    deleteUserToken();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.7} onPress={onOpen}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}></View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log('clicked right')}>
            {/* <Image
              source={require('../assets/images/profile.png')}
              style={styles.image}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Button title="Sign out" onPress={onSignOut} />
      </View>
      <Portal>
        <BottomModal modalizeRef={modalizeRef} height={500} />
      </Portal>
    </SafeAreaView>
  );
}
