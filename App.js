// public imports
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

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
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      {user == null ? <AuthContainer /> : <HomeContainer />}
    </NavigationContainer>
  );
}
