import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources.tx';
import Navigation from "./navigation";
import useColorScheme from "./hooks/useColorScheme";
import AppContextWrapper from "./AppContextWrapper";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContextWrapper>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation colorScheme={colorScheme} />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AppContextWrapper>
    );
  }
}

