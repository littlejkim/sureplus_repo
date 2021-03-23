// public imports
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PlaidLink, openLink } from 'react-native-plaid-link-sdk';

// custom imports
import styles from '../../styles/welcome.styles';
import { SignUpContext } from '../SignUpScreen';

export default function LinkBankForm({ navigation }) {
  const { institutions, setInstitutions } = useContext(SignUpContext);

  const [linkToken, setLinkToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    _getLinkToken();
  }, [setLinkToken]);

  const _continue = () => {
    navigation.navigate('LinkBankComplete');
  };

  const _setInstitutions = (value) => {
    setInstitutions([
      ...institutions,
      {
        institution_id: value.metadata.institution.id,
        institution_name: value.metadata.institution.name,
        publicToken: value.publicToken,
      },
    ]);
    _continue();
  };

  const _getLinkToken = () => {
    setIsLoading(true);
    fetch('https://sandbox.plaid.com/link/token/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: '5ea67c94e3979600119f263a',
        secret: '224549ea96cf3829a1050652e6823a',
        client_name: 'Sureplus',
        country_codes: ['US'],
        language: 'en',
        user: {
          client_user_id: 'unique_user_id',
        },
        products: ['transactions'],
      }),
    })
      .then((response) => response.json())
      .then((json) => setLinkToken(json))
      .catch((error) => console.log('Error: ' + error))
      .finally(() => setIsLoading(false));
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Connect your bank to view subscriptions.
        </Text>
        <Text style={styles.bodyText}>
          We analyze your bank statement to track down subscriptions.
        </Text>
      </View>
      <View style={styles.footer}>
        {isLoading ? (
          <View
            style={[
              styles.mainButton,
              { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
            ]}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : (
          <PlaidLink
            tokenConfig={{ token: linkToken.link_token }}
            onSuccess={(success) => _setInstitutions(success)}
            onExit={(exit) => console.log(exit)}>
            <View
              style={[
                styles.mainButton,
                { backgroundColor: theme.colors.primary }, // check android margin bottom for footer
              ]}>
              <Text style={styles.mainButtonText}>Connect my bank</Text>
            </View>
          </PlaidLink>
        )}
      </View>
    </View>
  );
}
