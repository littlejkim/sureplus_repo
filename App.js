// public imports
import React, { useEffect, useState, useRef } from 'react';
import { AppState, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import SplashScreen from 'react-native-splash-screen';

// custom imports
import Splash from './src/components/Splash';
import { HomeContainer } from './src/navigation/HomeContainer';
import { OnboardingContainer } from './src/navigation/OnboardingContainer';
import { fetchUserToken, storeUserToken } from './src/utils/userUtils';
import { LightTheme, DarkTheme } from './src/styles/constants';
import { listMoscatoUsers, listUserDevices } from './src/graphql/queries';
import { onCreateUserDevice } from './src/graphql/subscriptions';

export default function App() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const colorScheme = useColorScheme(); // used to find user color scheme (dark/light)
  const [user, setUser] = useState(undefined);

  // firebase navigation references
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // testing appsync api call without any @auth directive -> works
  async function testAmplifyApi() {
    try {
      const deviceData = await API.graphql(graphqlOperation(listUserDevices));
      console.log('deviceData', deviceData.data.listUserDevices);
    } catch (err) {
      console.log('error fetching devices', err);
    }

    API.post('twilioapi', '/test/sms', {
      body: { data: 'message' },
    })
      .then((res) => console.log('/test/sms: ', res))
      .catch((err) => console.log('/test/sms err: ', err));

    // await API.graphql(graphqlOperation(onCreateUserDevice)).subscribe({
    //   next: ({ provider, value }) =>
    //     console.log('SUBSCRIPTION: ', { provider, value }),
    //   error: (error) => console.log('ERROR: ', error),
    // });
  }

  function firebaseSetup() {
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
  }

  const _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    SplashScreen.show();
  };

  // loads initial user token from async storage (userUtils.js)
  const initalDataLoad = async () => {
    const userToken = await fetchUserToken();
    if (userToken !== null) {
      return userToken;
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    firebaseSetup();
    initalDataLoad()
      .then((response) => setUser(response))
      .then(SplashScreen.hide());
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

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
        routeNameRef.current = currentScreenName;
      }}
      theme={colorScheme === 'light' ? LightTheme : DarkTheme}>
      {user == null ? <OnboardingContainer /> : <HomeContainer />}
    </NavigationContainer>
  );
}
