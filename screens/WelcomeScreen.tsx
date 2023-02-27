import { Button, Incubator, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelconeScreen({route, navigation}: RootStackScreenProps<'Welcome'>) {
  return (
    <SafeAreaView>
      <Text>
        Unipool
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});