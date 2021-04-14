/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Amplify, { Auth } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);
// Auth.currentCredentials()
//   .then((d) => console.log('Auth data: ', d))
//   .catch((e) => console.log('Auth error: ', e));

AppRegistry.registerComponent(appName, () => App);
