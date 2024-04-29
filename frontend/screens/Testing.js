import React from 'react';
import { WebView } from 'react-native-webview';

const MyWebView = () => {
  return (
    <WebView
      source={{ uri: 'https://www.google.com/maps/@25.493856,81.8612133,17z?entry=ttu' }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
    />
  );
};

export default MyWebView;