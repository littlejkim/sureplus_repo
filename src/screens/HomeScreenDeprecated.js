// public imports
import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RNRestart from 'react-native-restart'; // temporary restart module (might need to replace during production level)
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../styles/home.styles';
import { TEXT_BOLD } from '../styles/fonts';
import { ReportScreen, WalletScreen } from './index';
import { deleteUserToken } from '../utils/userUtils';
import { BottomModal } from '../components/BottomModal';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreenDeprecated({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

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
    Alert.alert(
      'Sign out?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => deleteUserToken().then(RNRestart.Restart()),
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  // on refresh pulled
  const onRefresh = useCallback(() => {
    console.log('Refreshing data');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontSize: 17,
              fontFamily: TEXT_BOLD,
              textTransform: 'none',
            },
            activeTintColor: colors.text,
            inactiveTintColor: 'gray',
            upperCaseLabel: false,
            style: {
              alignSelf: 'flex-start',
              width: '55%',
              borderRadius: 70,
              elevation: 5, // shadow on Android
              shadowOpacity: 0, // change to 0.1 for iOS shadow
              shadowRadius: 0, // change to 4 for iOS shadow
            },
            pressOpacity: 0.6,
            indicatorStyle: {
              height: null,
              top: '10%',
              bottom: '10%',
              width: '45%',
              left: '2.5%',
              borderRadius: 100,
              backgroundColor: colors.primary,
            },
            tabStyle: {
              borderRadius: 100,
            },
          }}
          swipeVelocityImpact={0.4}
          initialLayout={{ width: Dimensions.get('window').width }}>
          <Tab.Screen name="Report" component={ReportScreen} />
          <Tab.Screen name="Wallet" component={WalletScreen} />
        </Tab.Navigator>
      </ScrollView>
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
