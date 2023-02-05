import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from '../screens/Home';
import TvShowsScreen from '../screens/TvShows';
import MoviesScreen from '../screens/Movies';
import MyListScreen from '../screens/MyList';
import MovieDetails from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
    <Stack.Screen
      name="TvShows"
      component={TvShowsScreen}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Movies"
      component={MoviesScreen}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
    <Stack.Screen
      name="MyList"
      component={MyListScreen}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
    <Stack.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
  </Stack.Navigator>
);
