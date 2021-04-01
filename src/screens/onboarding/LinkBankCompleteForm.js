// public imports
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../../screens/SignUpScreen';
import AvailableIcon from '../../assets/images/available.svg';

export default function LinkBankCompleteForm({ navigation }) {
  const theme = useTheme();
  const { institutions } = useContext(SignUpContext);

  const subscriptionData = [
    'netflix',
    'spotify',
    'masterclass',
    'hello',
    'abode',
    'adobe',
  ];

  const _continue = () => {
    navigation.navigate('Email');
  };

  //  <Text style={styles.bodyText}>
  //    institution id: {institutions[0].institution_id} {'\n'}
  //    institution name: {institutions[0].institution_name} {'\n'}
  //    public token: {institutions[0].publicToken}
  //  </Text>;

  function _renderItem({ item }) {
    return (
      <View
        style={[
          styles.linkedBankContainer,
          {
            backgroundColor: theme.colors.background,
            marginBottom: 8,
          },
        ]}>
        <Image
          source={require('../../assets/images/banks/bankofamerica.png')}
          style={{ height: 40, width: 40, marginRight: 20 }}
        />
        <Text
          style={[styles.linkedBankText, { color: theme.colors.mainText }]}
          numberOfLines={1}>
          {institutions[0].institution_name}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.body, { paddingHorizontal: 0 }]}>
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={[styles.titleText, { color: theme.colors.title }]}>
            Link Complete!
          </Text>
          <View
            style={[
              styles.linkedBankContainer,
              {
                backgroundColor: theme.colors.background,
                borderWidth: 0.5,
                borderColor: '#E5E6E8',
              },
            ]}>
            <Image
              source={require('../../assets/images/banks/bankofamerica.png')}
              style={{ height: 40, width: 40, marginRight: 20 }}
            />
            <Text
              style={[styles.linkedBankText, { color: theme.colors.mainText }]}
              numberOfLines={1}>
              {institutions[0].institution_name}
            </Text>
            <AvailableIcon height={20} width={20} r />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#F2F2F7',
            height: 12,
          }}
        />
        <View style={styles.linkCompleteBottomContainer}>
          <Text
            style={[
              styles.subscriptionsFoundText,
              { color: theme.colors.mainText, paddingHorizontal: 24 },
            ]}>
            We found {subscriptionData.length} subscriptions
          </Text>

          <FlatList
            scrollEnabled={false}
            style={{ paddingHorizontal: 24 }}
            data={subscriptionData}
            renderItem={_renderItem}
            keyExtractor={(item) => item.toString()}
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 200,
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => console.log('pressed home')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            Connect another bank
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={_continue}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>
            Complete sign up to view all
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
