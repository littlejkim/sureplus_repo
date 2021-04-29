// public imports
import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextField } from 'rn-material-ui-textfield';

// custom imports
import styles from '../../styles/welcome.styles';
import { OnboardingContext } from '../../navigation/OnboardingContainer';
import { string } from 'yup';
import { ERROR_COLOR, PRIMARY_COLOR } from '../../styles/constants';
import { TEXT_REGULAR } from '../../styles/fonts';
import { constant, property } from 'lodash-es';
import { TextBox } from '../../components/TextBox';

export default function DateofBirthForm({ navigation }) {
  const theme = useTheme();
  const { firstname, onboardingCase } = useContext(OnboardingContext);
  const [valid, setValid] = useState(false);
  const [_month, _setMonth] = useState(null);
  const [_day, _setDay] = useState(null);
  // Shame on me to write code like this, but I didn't know any other way to do this right.
  // Maybe I'll improve on this later - Marsh
  const [month, date, year] = new Date().toLocaleDateString('en-US').split('/');
  const localDate = [0, 0, 0];
  const boxRef = useRef([]);

  const isValidDate = (text) => {
    let dateString = `${_month}/${_day}/${text}`;
    console.log(dateString);
    setValid(false);
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    if (!day > 0 || !day <= monthLength[month - 1]) {
      setValid(true);
    }
    //need process to check for duplicate emails
  };

  const _continue = () => {
    if (onboardingCase === 0) {
      setFirstname(localFirst);
      setLastname(localLast);
      navigation.navigate('NewUser');
    }
    if (onboardingCase === 1) navigation.navigate('AdditionalForm');
  };

  const getMonth = (month) => {
    switch (month) {
      case '0':
        return 'January';
      case '1':
        return 'February';
      case '3':
        return 'March';
      case '4':
        return 'April';
      case '5':
        return 'May';
      case '6':
        return 'June';
      case '7':
        return 'July';
      case '8':
        return 'August';
      case '9':
        return 'September';
      case '10':
        return 'October';
      case '11':
        return 'November';
      case '12':
        return 'December';
      default:
        console.log('Error');
    }
    return;
  };

  const digitExtend = (month) => {
    if (month.toString().length == 1) {
      return '0' + month.toString();
    }
    return month.toString();
  };

  const _onPress = () => {
    /*if (onboardingCase === 0) {
      //set birthday for onboardingcontext
      navigation.navigate('LinkBank');
    } else {
      //try matching
      if (oldUser) {
        //
        if (onboardingCase === 3) {
          navigation.navigate('PreviousNumber');
        } else {
          navigation.navigate('EnterEmail');
        }
      } else {
        navigation.navigate('ReturningUser');
      }
    }*/
  };

  const changeDate = (index, date) => {
    if (index === 0) {
      _setMonth(date);
    }
    if (index === 1) {
      _setDay(date);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}>
      <View style={styles.body}>
        <Text style={[styles.titleText, { color: theme.colors.title }]}>
          Hi {firstname},{'\n'}what is your date of birth?
        </Text>
        <Text style={styles.bodyText}>
          e.g. {digitExtend(month)}/{digitExtend(date)}/{year}.
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 64,
            justifyContent: 'center',
            //marginRight: 38,
            marginRight: 22,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              //marginLeft: 53,
              //marginRight: 38,
            }}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 14, color: '#ACB5BE' }}>Month</Text>
              <View style={{ flexDirection: 'row', top: 16 }}>
                <TextBox
                  changeDate={changeDate}
                  index={0}
                  _maxLength={2}
                  _placeholder="MM"
                  ref={boxRef}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 14, color: '#ACB5BE' }}>Day</Text>
              <View style={{ flexDirection: 'row', top: 16 }}>
                <TextBox
                  changeDate={changeDate}
                  index={1}
                  _maxLength={2}
                  _placeholder="DD"
                  ref={boxRef}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 14, color: '#ACB5BE' }}>Year</Text>
              <View style={{ flexDirection: 'row', top: 16 }}>
                <View style={styles.dateContainer}>
                  <TextInput
                    ref={(el) => (boxRef.current[3] = el)}
                    keyboardAppearance={theme.dark ? 'dark' : 'light'}
                    tintColor={PRIMARY_COLOR}
                    fontSize={24}
                    width={24 * 4}
                    textAlign="center"
                    selectionColor={PRIMARY_COLOR}
                    keyboardType="number-pad"
                    placeholder="YYYY"
                    _maxLength={4}
                    clearTextOnFocus={true}
                    onChangeText={(text) => {
                      text.length === 4
                        ? (boxRef.current[3].blur(), isValidDate(text))
                        : console.log('false');
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.footer,
          {
            alignItems: 'flex-end',
            opacity: valid ? 1 : 0.5,
          },
        ]}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => (valid ? _onPress() : null)}
          activeOpacity={0.7}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
