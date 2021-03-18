// public imports
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import { Auth } from 'aws-amplify';

// custom imports
import { HomeContainer } from './src/navigation/HomeContainer';
import { AuthContainer } from './src/navigation/AuthContainer';
import { SplashScreen } from './src/screens';
import { fetchUserToken, deleteUserToken } from './src/utils/userUtils';
import { LightTheme, DarkTheme } from './src/styles/constants';

export default function App() {
  const colorScheme = useColorScheme(); // used to find user color scheme (dark/light)
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // firebase navigation references
  const navigationRef = useRef();
  const routeNameRef = useRef();

  useEffect(() => {
    console.log('Initial data loading...');
    signUp();
    // remote config default values
    remoteConfig()
      .setDefaults({
        signup_variations: 'false',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then((fetchedRemotely) => {
        if (fetchedRemotely) {
          remoteConfig().getValue('signup_variations');
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });

    // load user token
    if (isLoading === true) {
      initalDataLoad().then((response) => setUser(response));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        family_name: 'Kim',
        given_name: 'John',
        phone_number: '010455442313121',
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  // loads initial user token from async storage (userUtils.js)
  const initalDataLoad = async () => {
    const userToken = await fetchUserToken();
    if (userToken !== null) {
      return userToken;
    }
  };

  if (isLoading === true) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute()?.name)
      }
      onStateChange={() => {
        const previousScreenName = routeNameRef.current;
        const currentScreenName = navigationRef.current.getCurrentRoute().name;
        if (previousScreenName !== currentScreenName) {
          analytics().logScreenView({
            screen_name: currentScreenName,
            screen_class: currentScreenName,
          });
        }
        // Save the current route name for later comparision
        routeNameRef.current = currentScreenName;
      }}
      theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      {user == null ? <AuthContainer /> : <HomeContainer />}
    </NavigationContainer>
  );
}
