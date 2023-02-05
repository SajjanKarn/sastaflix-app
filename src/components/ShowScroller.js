import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import { useNavigation } from '@react-navigation/native';

const ShowScroller = ({ dataset, type, horizontal = true }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      contentContainerStyle={gStyle.pHHalf}
      data={dataset}
      horizontal={horizontal}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => {
        let renderItem = <View style={styles[type]} />;

        if (item.large_cover_image) {
          renderItem = (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('MovieDetails', {
                  id: item.id,
                  title: item.title
                })
              }
            >
              <Image
                source={{
                  uri: item.large_cover_image
                }}
                style={styles[`${type}Image`]}
              />
            </TouchableOpacity>
          );
        }

        return renderItem;
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

ShowScroller.defaultProps = {
  dataset: [],
  type: 'rectangle'
};

ShowScroller.propTypes = {
  // optional
  dataset: PropTypes.array,
  type: PropTypes.string
};

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 131,
    marginRight: 8,
    width: 91
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    resizeMode: 'contain',
    width: 91
  },
  round: {
    backgroundColor: colors.infoGrey,
    borderRadius: 48,
    height: 96,
    marginRight: 8,
    width: 96
  },
  roundImage: {
    height: 96,
    marginRight: 8,
    resizeMode: 'contain',
    width: 96
  }
});

export default ShowScroller;
