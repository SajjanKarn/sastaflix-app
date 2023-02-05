import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import HeaderHome from '../components/HeaderHome';
import ShowScroller from '../components/ShowScroller';
import { useFetch } from '../hooks/useFetch';

const TvShows = () => {
  const {
    data: tvShows,
    loading: loadingTvShows,
    error: errorTvShows
  } = useFetch(`/list_movies.json?genre=tvshows&limit=20&sort_by=like_count`);

  return (
    <View style={gStyle.container}>
      <HeaderHome show />

      <View style={gStyle.spacer12} />

      <View style={gStyle.pHHalf}>
        <Text style={gStyle.heading}>TV Shows</Text>
      </View>

      {loadingTvShows ? (
        <ActivityIndicator size="large" color="#b3b3b3" />
      ) : (
        <ShowScroller dataset={tvShows} />
      )}

      {/* <Cast /> */}
    </View>
  );
};

export default TvShows;
