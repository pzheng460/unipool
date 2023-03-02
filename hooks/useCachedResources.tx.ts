import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import {loadColors} from "../configs/react-native-ui-lib/FoundationConfig";
import {loadStyles} from "../configs/react-native-ui-lib/ComponentsConfig";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        loadColors();
        loadStyles();
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'Oceanwide-Semibold': require('../assets/fonts/Oceanwide-Semibold.otf'),
          'RobotoFlex': require('../assets/fonts/RobotoFlex.ttf'),
        });

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
    }

    loadResourcesAndDataAsync().then((e) => {
      setLoadingComplete(true);
      SplashScreen.hideAsync();
    });

  }, []);

  return isLoadingComplete;
}
