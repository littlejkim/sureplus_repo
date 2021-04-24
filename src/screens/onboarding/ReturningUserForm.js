// public imports
import React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';

export default function ReturningUserForm({ navigation }) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Are you a returning user?
        </Text>
        <Text style={styles.bodyText}>
          Your device is already registered{'\n'}in our system.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subButton}
          onPress={() => navigation.navigate('Name')}
          activeOpacity={0.5}>
          <Text style={[styles.subButtonText, { color: theme.colors.primary }]}>
            No, I'm new here
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate('PreviousNumber')}
          activeOpacity={0.7}>
          <Text style={styles.mainButtonText}>Continue as Jinje</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
