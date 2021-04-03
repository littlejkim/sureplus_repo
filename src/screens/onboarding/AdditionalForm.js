// public imports
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// custom imports
import styles from '../../styles/welcome.styles';
import EmailForm from './EmailForm';
import UsernameForm from './UsernameForm';
import UpArrow from '../../assets/images/up_arrow.svg';

export default function AdditionalForm({ navigation }) {
  const [viewHeight, setViewHeight] = useState();
  const [showPrev, setShowPrev] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef();
  const theme = useTheme();

  const _showNext = () => {
    scrollRef.current.scrollTo({ y: viewHeight, animated: true });
    setShowPrev(true);
    setStep(1);
  };

  const _showPrev = () => {
    scrollRef.current.scrollTo({ y: 0, animated: true });
    setShowPrev(false);
    setStep(0);
  };

  const _continue = () => {
    navigation.navigate('SetPassword');
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
          decelerationRate={0}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          snapToInterval={viewHeight}
          snapToAlignment={'center'}>
          <EmailForm screenHeight={viewHeight} theme={theme} />
          <UsernameForm screenHeight={viewHeight} theme={theme} />
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-20}>
        <View
          style={[
            styles.footer,
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
          <TouchableOpacity
            style={styles.nextButton}
            onPress={step === 0 ? _showNext : _continue}
            activeOpacity={0.7}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
