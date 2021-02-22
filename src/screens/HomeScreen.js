// public imports
import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

// custom imports
import styles from '../styles/home.styles';
import { deleteUserToken } from '../utils/userUtils';
import { BottomModal } from '../components/BottomModal';
import { PRIMARY_COLOR } from '../styles/constants';

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  // add buttons to top
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.7} onPress={onOpen}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <Button title="signout" onPress={onSignOut} />
        </View>
      ),
    });
  }, [navigation]);

  // menu modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // signout button (for testing)
  const onSignOut = () => {
    alert('Signing out');
    deleteUserToken();
  };

  // on refresh pulled
  const onRefresh = useCallback(() => {
    console.log('Refreshing data');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={PRIMARY_COLOR}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Text>Home Screen</Text>
      </ScrollView>
      <Portal>
        <BottomModal modalizeRef={modalizeRef} height={500} />
      </Portal>
    </SafeAreaView>
  );
}
