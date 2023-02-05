import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderHome from '../components/HeaderHome';
import ShowScroller from '../components/ShowScroller';
import { useFetch } from '../hooks/useFetch';

const Movies = () => {
  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies
  } = useFetch(`/list_movies.json?genre=action&limit=20&sort_by=like_count`);

  return (
    <View style={gStyle.container}>
      <HeaderHome show />

      <View style={gStyle.spacer12} />

      <View style={gStyle.pHHalf}>
        <Text style={gStyle.heading}>Movies</Text>
      </View>

      {loadingMovies ? (
        <ActivityIndicator size="large" color="#b3b3b3" />
      ) : (
        <ShowScroller dataset={movies} type="rectangle" />
      )}

      <Cast />
    </View>
  );
};

export default Movies;
