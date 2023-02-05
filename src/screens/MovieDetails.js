import * as React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { colors, gStyle } from '../constants';
import { useRoute } from '@react-navigation/native';

// components
import Header from '../components/Header';
import { useFetch } from '../hooks/useFetch';

const MovieDetails = () => {
  const { id, title } = useRoute().params;

  const {
    data: movie,
    loading: loadingMovie,
    error: errorMovie
  } = useFetch(`/movie_details.json?movie_id=${id}`, {}, true);

  return (
    <ScrollView style={gStyle.container}>
      <Header
        bg={colors.headerBarBg}
        showBack
        title={title.length > 20 ? `${title.substring(0, 20)}...` : title}
      />

      {loadingMovie ? (
        <ActivityIndicator size="large" color="#b3b3b3" />
      ) : (
        movie && (
          <View style={styles.container}>
            <Image
              source={{ uri: movie.large_cover_image }}
              style={styles.movieBannerImage}
            />
            <Text style={styles.releaseYear}>
              {movie.year} | {movie.runtime} min
            </Text>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.imdbRating}>
              IMDB Rating: {movie.rating} / 10
            </Text>

            <View style={styles.genreContainer}>
              {movie.genres.map((genre) => (
                <View style={styles.genre} key={genre}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.movieDescription}>
              {movie.description_intro.length > 800
                ? `${movie.description_intro.substring(0, 800)}...`
                : movie.description_intro}
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.backgroundImageContainer}
            >
              {movie.background_image && (
                <Image
                  source={{ uri: movie.background_image }}
                  style={styles.backgroundImage}
                />
              )}
              {movie.background_image_original && (
                <Image
                  source={{ uri: movie.background_image_original }}
                  style={styles.backgroundImage}
                />
              )}
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {}}
              style={styles.watchButton}
            >
              <Text style={styles.watchText}> Watch Now</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  movieBannerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 10
  },
  releaseYear: {
    fontSize: 14,
    color: '#b3b3b3',
    marginTop: 15
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 5
  },
  imdbRating: {
    fontSize: 18,
    color: '#f5de50',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  genre: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10
  },
  genreText: {
    color: colors.white
  },
  movieDescription: {
    fontSize: 14,
    color: '#b3b3b3'
  },
  backgroundImageContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  backgroundImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginRight: 10
  },
  watchButton: {
    // netflix button
    backgroundColor: '#e50914',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  watchText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default MovieDetails;
