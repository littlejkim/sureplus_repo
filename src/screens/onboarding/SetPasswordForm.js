// public imports
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

// custom imports
import styles from '../../styles/password.styles';
import { MainModal } from '../../components/MainModal';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function SetPasswordForm(props) {
  const [title, setTitle] = useState(
    'Welcome to Sureplus!\nCreate your password.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [initialPassword, setInitialPassword] = useState([]);
  const [verifyPassword, setVerifyPassword] = useState([]);
  const [maskCount, setMaskCount] = useState(0);
  const keyboardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, 'DEL'];
  // error message constants for modal
  const [modal, setModal] = useState(false);
  const contents = [
    {
      title: 'Success',
      body: 'Passwords matched',
    },
    {
      title: 'Error',
      body: 'Passwords did not match. Please try again.',
    },
  ];

  const _addPassword = (item) => {
    if (initialPassword.length < 4) {
      setMaskCount(maskCount + 1);
      const temp = [...initialPassword, item];
      setInitialPassword(temp);
    } else if (verifyPassword.length < 4) {
      setMaskCount(maskCount + 1);
      const temp = [...verifyPassword, item];
      setVerifyPassword(temp);
    }
  };

  const _deletePassword = () => {
    if (initialPassword.length < 4 && initialPassword.length !== 0) {
      const temp = [...initialPassword];
      temp.splice(-1, 1);
      setInitialPassword(temp);
    } else if (verifyPassword.length < 4 && verifyPassword.length !== 0) {
      const temp = [...verifyPassword];
      temp.splice(-1, 1);
      setVerifyPassword(temp);
    }
  };

  useEffect(() => {
    if ((initialPassword.length + verifyPassword.length) % 4 === 0) {
      setMaskCount(0);
    }
  }, [initialPassword, verifyPassword]);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <LoadingSpinner loading={isLoading} />
      <MainModal
        visible={modal}
        hide={() => {
          setModal(!modal);
        }}
        contents={contents[1]}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.bodyText}>4 numeric digits</Text>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '50%',
              flexDirection: 'row',
            }}>
            <View
              style={[
                styles.passwordDot,
                {
                  opacity: maskCount >= 1 ? 1 : 0.3,
                },
              ]}
            />
            <View
              style={[
                styles.passwordDot,
                {
                  opacity: maskCount >= 2 ? 1 : 0.3,
                },
              ]}
            />
            <View
              style={[
                styles.passwordDot,
                {
                  opacity: maskCount >= 3 ? 1 : 0.3,
                },
              ]}
            />
            <View
              style={[
                styles.passwordDot,
                {
                  opacity: maskCount >= 4 ? 1 : 0.3,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <FlatList
            data={keyboardNumbers}
            renderItem={({ item, index }) =>
              index === 9 ? (
                <View style={styles.item} />
              ) : index === 11 ? (
                <TouchableOpacity style={styles.item} onPress={_deletePassword}>
                  <Image
                    source={require('../../assets/images/delete.png')}
                    style={{ aspectRatio: 0.3, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.item}
                  activeOpacity={0.5}
                  onPress={() => {
                    _addPassword(item);
                  }}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )
            }
            keyExtractor={(item) => item.toString()}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
        <TouchableOpacity
          style={styles.footerButton}
          activeOpacity={0.7}
          onPress={() => console.log('Pressed Face ID')}>
          <Image
            source={require('../../assets/images/check.png')}
            style={{
              height: '20%',
              resizeMode: 'contain',
              marginRight: 5,
            }}
          />
          <Text style={styles.footerText}>Use Face ID Next Time</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
