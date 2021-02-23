// public imports
import React from 'react';
import { View, Text, Image } from 'react-native';

// custom imports
import styles from '../styles/home.styles';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.reportContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitleText}>Upcoming Subscriptions</Text>
          <View style={styles.cardContainerContent}>
            <Image
              source={require('../assets/images/adobe_creative_cloud_icon.png')}
              style={styles.subscriptionIcon}
            />
            <View style={styles.subscriptionContainer}>
              <Text style={styles.cardSubscriptionTitleText}>
                Adobe Creative Cloud
              </Text>
              <Text style={styles.cardSubscriptionPriceText}>
                $.59 / Monthly
              </Text>
            </View>
          </View>
          <View style={styles.cardContainerContent}>
            <Image
              source={require('../assets/images/netflix_icon.png')}
              style={styles.subscriptionIcon}
            />
            <View style={styles.subscriptionContainer}>
              <Text style={styles.cardSubscriptionTitleText}>Netflix</Text>
              <Text style={styles.cardSubscriptionPriceText}>
                $.59 / Monthly
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitleText}>Wallet Activity</Text>
        </View>
      </View>
    </View>
  );
}
