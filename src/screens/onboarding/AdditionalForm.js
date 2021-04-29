// public imports
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { string } from 'yup';
import { API } from 'aws-amplify';

// custom imports
import styles from '../../styles/welcome.styles';
import EmailForm from './EmailForm';
import UsernameForm from './UsernameForm';
import UpArrow from '../../assets/images/up_arrow.svg';

export default function AdditionalForm({ navigation }) {
  const [viewHeight, setViewHeight] = useState();
  const [showPrev, setShowPrev] = useState(false);
  const [step, setStep] = useState(0);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [usernameText, setUsernameText] = useState('');
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const scrollRef = useRef();

  const _showNext = () => {
    scrollRef.current.scrollTo({ y: viewHeight, animated: true });
    setShowPrev(true);
    setStep(1);
    setFocusUsername(true);
  };

  const _showPrev = () => {
    scrollRef.current.scrollTo({ y: 0, animated: true });
    setShowPrev(false);
    setStep(0);
    setFocusEmail(true);
  };

  const _unfocusEmail = () => {
    setFocusEmail(false);
  };

  const _unfocusUsername = () => {
    setFocusUsername(false);
  };

  const _scrollEndFalse = () => {
    setScrollEnd(false);
  };

  const _continue = () => {
    navigation.navigate('SetPassword');
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  const _onPressEmail = async () => {
    if (!string().email().required().isValidSync(emailText)) {
      setEmailErrorMsg('Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    await API.post('twilioapi', '/email/check', {
      body: { email: emailText },
    })
      .then((res) =>
        res.isTaken
          ? setEmailErrorMsg(
              'There already is a sureplus account associated with this email.',
            )
          : _showNext(),
      )
      .catch((err) => console.log('/test/sms err: ', err));
    setIsLoading(false);
  };

  const _onPressUsername = async () => {
    if (usernameText) {
      if (
        !string()
          .matches(/^[ A-Za-z0-9_.]*$/)
          .isValidSync(usernameText)
      ) {
        setUsernameErrorMsg(
          'Usernames can only use letters, numbers, underscores and periods.',
        );
        return;
      }
      if (!string().min(4).isValidSync(usernameText)) {
        setUsernameErrorMsg(
          'Your username should have a minimum of 6 characters.',
        );
        return;
      }
      if (string().matches(/[.]$/).isValidSync(usernameText)) {
        setUsernameErrorMsg("You can't end your username with as a period.");
        return;
      }
      if (
        !string()
          .matches(/^(?!.*?[._]{2})[a-zA-Z0-9_.]+$/)
          .isValidSync(usernameText)
      ) {
        setUsernameErrorMsg("You can't have more than one period in a row.");
        return;
      }

      setIsLoading(true);
      await API.post('twilioapi', '/username/check', {
        body: { username: usernameText },
      })
        .then((res) =>
          res.isTaken
            ? (console.log('true'),
              setUsernameErrorMsg('The following username is already in use.'))
            : _continue(),
        )
        .catch((err) => console.log('/test/sms err: ', err));
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.body}
        onLayout={(event) => {
          var { height } = event.nativeEvent.layout;
          setViewHeight(height);
        }}>
        <ScrollView
          ref={scrollRef}
          bounces={false}
          decelerationRate="normal"
          scrollEnabled={false}
          scrollEventThrottle={0}
          onScroll={({ nativeEvent }) => {
            //Scroll to bottom
            if (isCloseToBottom(nativeEvent)) {
              setScrollEnd(true);
            }
            //Scroll to top
            if (nativeEvent.contentOffset.y === 0) {
              setScrollEnd(true);
            }
          }}
          showsVerticalScrollIndicator={false}
          snapToInterval={viewHeight}
          snapToAlignment={'center'}>
          <EmailForm
            screenHeight={viewHeight}
            focusEmail={focusEmail}
            unfocusEmail={_unfocusEmail}
            scrollEnd={scrollEnd}
            setScrollEnd={_scrollEndFalse}
            setEmailText={setEmailText}
            emailErrorMsg={emailErrorMsg}
            setEmailErrorMsg={setEmailErrorMsg}
            _onSubmitEditing={_onPressEmail}
            isLoading={isLoading}
          />
          <UsernameForm
            screenHeight={viewHeight}
            focusUsername={focusUsername}
            unfocusUsername={_unfocusUsername}
            scrollEnd={scrollEnd}
            setScrollEnd={_scrollEndFalse}
            setUsernameText={setUsernameText}
            usernameErrorMsg={usernameErrorMsg}
            setUsernameErrorMsg={setUsernameErrorMsg}
            _onSubmitEditing={_onPressUsername}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        keyboardVerticalOffset={-35}>
        <View
          style={[
            styles.footer,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              position: 'absolute',
              bottom: 0,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          {showPrev ? (
            <TouchableOpacity style={styles.previousButton} onPress={_showPrev}>
              <UpArrow height={'100%'} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {/*configured button so you cant go to next stage without writing a verified email addr*/}
          {step ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={_onPressUsername}
              activeOpacity={0.7}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={_onPressEmail}
              activeOpacity={0.7}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
