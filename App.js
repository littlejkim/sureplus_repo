// public imports
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import { API, Auth, graphqlOperation } from 'aws-amplify';

// custom imports
import { HomeContainer } from './src/navigation/HomeContainer';
import { OnboardingContainer } from './src/navigation/OnboardingContainer';
import { SplashScreen } from './src/screens';
import { fetchUserToken, storeUserToken } from './src/utils/userUtils';
import { LightTheme, DarkTheme } from './src/styles/constants';
import { listMoscatoUsers, listUserDevices } from './src/graphql/queries';
import { onCreateUserDevice } from './src/graphql/subscriptions';

//guest client routine

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

  useEffect(() => {
    // storeUserToken(testUserData);
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
  }, [isLoading]);

  // loads initial user token from async storage (userUtils.js)
  const initalDataLoad = async () => {
    const userToken = await fetchUserToken();
    if (userToken !== null) {
      return userToken;
    }
  };

  // if (isLoading === true) {
  //   return <SplashScreen />;
  // }
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
      {user == null ? <OnboardingContainer /> : <HomeContainer />}
    </NavigationContainer>
  );
}
