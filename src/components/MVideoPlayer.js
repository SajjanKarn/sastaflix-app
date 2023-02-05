import React from 'react';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, View } from 'react-native';

export const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
  // play the video in landscape mode
  if (fullscreenUpdate === 0) {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  } else if (fullscreenUpdate === 1) {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
};

export default function MVideoPlayer({ source, style }) {
  return (
    <View style={[styles.container, style]}>
      <Video
        source={{
          uri: source
        }}
        shouldPlay
        useNativeControls
        style={styles.video}
        onFullscreenUpdate={(event) => {
          onFullscreenUpdate(event);
          console.log(event);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: '100%',
    height: '100%'
  }
});
