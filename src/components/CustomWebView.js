import React from 'react';
import { WebView } from 'react-native-webview';

export default function CustomWebView() {
  return <WebView source={{ uri: 'https://sureplus.io' }} />;
}
