// public imports
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// custom imports
import {HomeScreen, OnboardingScreen} from './src/components/';

import {
  clearAllTokens,
  fetchUserToken,
  storeUserToken,
} from './src/utils/userUtils';
import {testUserData} from './src/data/testUserData';

const Stack = createStackNavigator();

export default function () {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Initial data loading...');
    if (isLoading === true) {
      initalDataLoad().then((response) => setUser(response));
      setIsLoading(false);
    }
  }, [isLoading]);

  // loads initial user token from async storage (userUtils.js)
  const initalDataLoad = async () => {
    try {
      const userToken = await fetchUserToken();
      if (userToken !== null) {
        console.log('User token found', userToken);
        return true;
      } else {
        console.log('User token not found');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen name="Onboarding Screen" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Home Screen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
