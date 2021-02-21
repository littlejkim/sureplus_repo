import AsyncStorage from '@react-native-community/async-storage';

// get all stored tokens (for testing purposes only)
const fetchAllTokens = async () => {
  try {
    const response = await AsyncStorage.getAllKeys();
    console.log('All token fetched :', response);
  } catch (e) {
    console.log(e);
  }
};

// delete ALL stored tokens (for testing purposes ONLY)
const deleteAllTokens = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All token cleared');
  } catch (e) {
    console.log(e);
  }
};

// store token to async storage
const storeUserToken = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('userToken', jsonValue);
    console.log('Async token stored: ', user);
  } catch (e) {
    console.log('Error saving async token: ', e);
  }
};

// retrieve token from async storage
const fetchUserToken = async () => {
  try {
    const user = await AsyncStorage.getItem('userToken');
    if (user !== null) {
      const parsedUser = JSON.parse(user);
      console.log('User token found: ', parsedUser);
      return parsedUser.name;
    } else {
      console.log('User token not found');
      return null;
    }
  } catch (e) {
    console.log('Error retrieving async token: ', e);
  }
};

// delete token from async storage
const deleteUserToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Async token deleted');
  } catch (e) {
    console.log('Error deleting async token: ', e);
  }
};

export {
  fetchAllTokens,
  deleteAllTokens,
  storeUserToken,
  fetchUserToken,
  deleteUserToken,
};
