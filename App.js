import React, { useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const APP_URL = 'https://talabak-hona-app.regal-pike-7927.chatgpt.site/';
const APP_HOST = 'talabak-hona-app.regal-pike-7927.chatgpt.site';

export default function App() {
  const webRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webRef}
        source={{ uri: APP_URL }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowsBackForwardNavigationGestures
        setSupportMultipleWindows={false}
        pullToRefreshEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        onShouldStartLoadWithRequest={(request) => {
          try {
            const url = new URL(request.url);
            const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
            if (isHttp && (url.hostname === APP_HOST || url.hostname.endsWith('.chatgpt.site'))) {
              return true;
            }
            if (request.navigationType === 'click' && request.url !== APP_URL) {
              Linking.openURL(request.url).catch(() => {});
              return false;
            }
            return isHttp;
          } catch {
            Linking.openURL(request.url).catch(() => {});
            return false;
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  webview: { flex: 1, backgroundColor: '#ffffff' },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  }
});
