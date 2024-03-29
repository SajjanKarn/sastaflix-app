import * as React from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { func } from './src/constants';

// main navigation stack
import RootStack from './src/navigation/RootStack';
import * as NavigationBar from 'expo-navigation-bar';

const App = () => {
  NavigationBar.setBackgroundColorAsync('#000');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function prepare() {
      try {
        // keeps the splash screen visible while assets are cached
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />

      <RootStack />
    </React.Fragment>
  );
};

export default App;
