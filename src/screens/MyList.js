import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderHome from '../components/HeaderHome';
import MVideoPlayer from '../components/MVideoPlayer';

import generateMagnet from '../utils/magnet';
import WebView from 'react-native-webview';

const MyList = () => {
  const magnet = generateMagnet(
    '16B087DFF9C8153072BD35C1BEC245CB831AEF4D',
    'Avengers: Infinity War'
  );

  return (
    <View style={gStyle.container}>
      <HeaderHome show />

      <View style={gStyle.spacer12} />

      <View style={gStyle.pHHalf}>
        <Text style={gStyle.heading}>My List</Text>
      </View>

      <MVideoPlayer
        source={`http://192.168.1.66:3000/stream/16B087DFF9C8153072BD35C1BEC245CB831AEF4D/Avengers:%20Infinity%20War`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    alignSelf: 'center',
    width: '100%',
    height: '100%'
  }
});

export default MyList;
