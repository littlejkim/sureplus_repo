// public imports
import React, { useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import WebView from 'react-native-webview';
import { TEXT_REGULAR } from '../styles/fonts';

const { height: initialHeight } = Dimensions.get('window');

// instructions (in parent)

//   const modalizeRef = useRef(null);
//   const onOpen = () => {
//     modalizeRef.current?.open();
//   };

// <CustomWebView
//         modalizeRef={modalizeRef}
//         height={Dimensions.get('window').height - 80}
//         url={'https://www.sureplus.io'}
// />

// and in whatever button
// onPress={onOpen}

export const CustomWebView = (props) => {
  const webViewRef = useRef(null);
  const [height, setHeight] = useState(initialHeight);

  const _handleLayout = ({ layout }) => {
    setHeight(layout.height);
  };

  const _handleClose = () => {
    props.modalizeRef.current?.close();
  };

  const _renderHeader = () => {
    return (
      <View
        style={{
          height: 40,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={_handleClose}>
          <Text
            style={{
              fontFamily: TEXT_REGULAR,
              fontWeight: '600',
              fontSize: 20,
            }}>
            Press to close
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modalize
      ref={props.modalizeRef}
      // HeaderComponent={_renderHeader}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      panGestureEnabled={false}
      scrollEnabled={false}
      modalHeight={props.height}
      onLayout={_handleLayout}
      onOpen={() => console.log('modal opened')}
      onClose={() => console.log('modal closed')}>
      <WebView
        ref={webViewRef}
        startInLoadingState={true}
        showsVerticalScrollIndicator={false}
        source={{
          uri: props.url,
        }}
        style={{ height, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
    </Modalize>
  );
};
