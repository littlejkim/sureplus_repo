// public imports
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// custom imports
import { SplashScreen } from './src/components/';
import { HomeContainer } from './src/navigation/HomeContainer';
import { AuthContainer } from './src/navigation/AuthContainer';

import {
  fetchUserToken,
  storeUserToken,
  deleteUserToken,
  fetchAllTokens,
  deleteAllTokens,
} from './src/utils/userUtils';
import { testUserData } from './src/data/testUserData';

export default function App() {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Initial data loading...');
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
    <NavigationContainer>
      {user == null ? <AuthContainer /> : <HomeContainer />}
    </NavigationContainer>
  );
}
