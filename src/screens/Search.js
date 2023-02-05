import * as React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderSearch from '../components/HeaderSearch';
import ShowScroller from '../components/ShowScroller';
import { useFetch } from '../hooks/useFetch';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const { data: searchResult, loading: loadingSearch } = useFetch(
    `/list_movies.json?query_term=${search}&limit=20&sort_by=like_count`
  );

  navigation.addListener('focus', () => {
    setSearch('');
  });

  return (
    <React.Fragment>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <HeaderSearch onChangeSetTextSearch={setSearch} />
      </TouchableWithoutFeedback>

      <View style={gStyle.mT2}>
        {loadingSearch ? (
          <ActivityIndicator size="large" color="#b3b3b3" />
        ) : searchResult && searchResult.length > 0 ? (
          <ShowScroller dataset={searchResult} />
        ) : null}
      </View>

      <Cast />
    </React.Fragment>
  );
};

export default Search;
