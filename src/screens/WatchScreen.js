import * as React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, gStyle } from '../constants';
import * as ScreenOrientation from 'expo-screen-orientation';

import { STREAMING_API_URL } from '../../config/api';
import { Video } from 'expo-av';
import * as NavigationBar from 'expo-navigation-bar';

// components
import Header from '../components/Header';

const WatchScreen = () => {
  const { hash, title } = useRoute().params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  async function changeScreenOrientation() {
    // make the navigation bar transparent
    NavigationBar.setBackgroundColorAsync('#000');
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }

  return (
    <View style={gStyle.container}>
      <Header
        bg={colors.headerBarBg}
        showBack
        title={title.length > 20 ? `${title.substring(0, 20)}...` : title}
      />

      <Video
        ref={video}
        style={{
          width: '100%',
          height: 300,
          backgroundColor: 'black'
        }}
        source={{
          uri: `${STREAMING_API_URL}/${hash}/${title}`
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onFullscreenUpdate={(status) => {
          if (status.fullscreenUpdate === 1) {
            changeScreenOrientation();
          }

          if (status.fullscreenUpdate === 3) {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
          }
        }}
      />
    </View>
  );
};

export default WatchScreen;
