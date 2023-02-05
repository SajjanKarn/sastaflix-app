import * as React from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderHome from '../components/HeaderHome';
import PromotionBanner from '../components/PromotionBanner';
import ShowScroller from '../components/ShowScroller';

import { useFetch } from '../hooks/useFetch';

const Home = () => {
  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies
  } = useFetch('/list_movies.json?genre=action&limit=8&sort_by=download_count');

  const {
    data: popularMovies,
    loading: loadingPopularMovies,
    error: errorPopularMovies
  } = useFetch('/list_movies.json?sort_by=like_count&limit=8');

  const {
    data: trending,
    loading: loadingTrendingMovies,
    error: errorTrendingMovies
  } = useFetch('/list_movies.json?sort_by=download_count&limit=8');

  const {
    data: watchitagain,
    loading: loadingWatchitagainMovies,
    error: errorWatchitagainMovies
  } = useFetch('/list_movies.json?sort_by=rating&limit=8');

  const {
    data: documentaries,
    loading: loadingDocumentariesMovies,
    error: errorDocumentariesMovies
  } = useFetch(
    '/list_movies.json?genre=documentary&limit=8&sort_by=like_count'
  );

  const {
    data: preview,
    loading: loadingPreviewMovies,
    error: errorPreviewMovies
  } = useFetch('/list_movies.json?genre=animation&limit=8&sort_by=like_count');

  // on active tab press, scroll to top
  const ref = React.useRef(null);
  useScrollToTop(ref);

  // local state
  const [showHeader, setShowHeader] = React.useState(true);
  const [offset, setOffset] = React.useState(0);

  const onScroll = (event) => {
    let show = showHeader;
    const currentOffset = event.nativeEvent.contentOffset.y;
    show = currentOffset < offset;

    if (show !== showHeader || offset <= 0) {
      // account for negative value with "bounce" offset
      if (offset <= 0) show = true;

      setShowHeader(show);
    }

    setOffset(currentOffset);
  };

  return (
    <View style={gStyle.container}>
      <HeaderHome show={showHeader} />

      <ScrollView
        ref={ref}
        bounces
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <PromotionBanner />

        <Text style={gStyle.heading}>Previews</Text>
        {loadingPreviewMovies ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : (
          <ShowScroller dataset={preview} type="round" />
        )}

        <Text style={gStyle.heading}>Action</Text>
        {loadingMovies ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : (
          <ShowScroller dataset={movies} />
        )}

        <Text style={gStyle.heading}>Popular Movies</Text>
        {loadingPopularMovies ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : (
          <ShowScroller dataset={popularMovies} />
        )}

        <Text style={gStyle.heading}>Trending Now</Text>
        {loadingTrendingMovies ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : (
          <ShowScroller dataset={trending} />
        )}

        <Text style={gStyle.heading}>Watch It Again</Text>
        {loadingWatchitagainMovies ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : (
          <ShowScroller dataset={watchitagain} />
        )}

        <Text style={gStyle.heading}>Documentaries</Text>
        {loadingDocumentariesMovies ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : (
          <ShowScroller dataset={documentaries} />
        )}

        <View style={gStyle.spacer3} />
      </ScrollView>

      <Cast />
    </View>
  );
};

export default Home;
