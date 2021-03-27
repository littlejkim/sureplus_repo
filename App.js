// public imports
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import { API, graphqlOperation } from 'aws-amplify';
var CryptoJS = require('crypto-js');

// custom imports
import { HomeContainer } from './src/navigation/HomeContainer';
import { AuthContainer } from './src/navigation/AuthContainer';
import { SplashScreen } from './src/screens';
import { fetchUserToken, storeUserToken } from './src/utils/userUtils';
import { testUserData } from './src/data/testUserData';
import { LightTheme, DarkTheme } from './src/styles/constants';
import { listMoscatoUsers } from './src/graphql/queries';

export default function App() {
  const colorScheme = useColorScheme(); // used to find user color scheme (dark/light)
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // firebase navigation references
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // testing appsync api call without any @auth directive -> works
  async function testAmplifyApi() {
    try {
      const userData = await API.graphql(graphqlOperation(listMoscatoUsers));
      console.log('userData', userData.data.listMoscatoUsers);
    } catch (err) {
      console.log('error fetching todos', err);
    }
  }

  // test device id encryption and decryption
  // need to store the key from both frontend and backend -> perhaps store it as env variable
  // env var ENCRYPT_KEY during production
  function testEncryption() {
    var ciphertext = CryptoJS.AES.encrypt(
      'deviceID',
      'jioy7A!Y&h9ha90AJkJA872',
    );
    console.log('encrypted text', ciphertext.toString());

    var bytes = CryptoJS.AES.decrypt(
      ciphertext.toString(),
      'jioy7A!Y&h9ha90AJkJA872',
    );
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decrypted text', plaintext);
  }

  useEffect(() => {
    //storeUserToken(testUserData);
    testAmplifyApi();
    //testEncryption();
    console.log('Initial data loading...');

    // set cache length to 30 milliseconds for testing purposes (only on dev), reference: https://rnfirebase.io/remote-config/usage
    remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30,
    });
    // set firebase remote config default values
    remoteConfig()
      .setDefaults({
        signup_variation: 'false',
        twilio_number: '+14158180934',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then((fetchedRemotely) => {
        if (fetchedRemotely) {
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
      theme={colorScheme === 'light' ? LightTheme : DarkTheme}>
      {user == null ? <AuthContainer /> : <HomeContainer />}
    </NavigationContainer>
  );
}
