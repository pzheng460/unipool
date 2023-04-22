import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources.tx';
import Navigation from "./navigation";
import useColorScheme from "./hooks/useColorScheme";
import AppContextWrapper from "./AppContextWrapper";

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContextWrapper>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </AppContextWrapper>
    );
  }
}

