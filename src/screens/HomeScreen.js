// public imports
import React, { useRef, useLayoutEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

// custom imports
import styles from '../styles/container.styles';
import { deleteUserToken } from '../utils/userUtils';

export default function HomeScreen({ navigation }) {
  // set button for menu
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title="menu" onPress={onOpen} />,
    });
  }, [navigation]);

  // menu modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // test signout button
  const onSignOut = () => {
    deleteUserToken();
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Sign out" onPress={onSignOut} />
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalHeight={500}
          onOpen={() => console.log('modal opened')}
          onClose={() => console.log('modal closed')}
        />
      </Portal>
    </View>
  );
}
