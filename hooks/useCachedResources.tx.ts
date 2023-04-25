import {FontAwesome} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import {Asset} from 'expo-asset';
import {Image} from "react-native";
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

        await Promise.all(cacheImages([
          require("../assets/icon.png"),
          require("../assets/logo-no-background.png"),
        ]));

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

function cacheImages(images: any[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
