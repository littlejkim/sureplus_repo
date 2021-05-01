// public imports
import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Portal } from 'react-native-portalize';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/home.styles';
import { BottomModal } from '../components/BottomModal';

import { useHeaderHeight } from '@react-navigation/stack';
export default function HomeScreen({ navigation }) {
  const headerHeight = useHeaderHeight();

  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const backgroundColor = !colors.dark ? '#F1F2F4' : '#17171b';

  // menu modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // on refresh pulled
  const onRefresh = useCallback(() => {
    console.log('Refreshing data');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // add buttons to top
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor,
        height: headerHeight,
      },
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.7} onPress={onOpen}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.profile}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.topContainer}></View>
      <Portal>
        <BottomModal
          modalizeRef={modalizeRef}
          height={500}
          style={colors.background}
        />
      </Portal>
    </View>
  );
}
