import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({route, navigation}: RootStackScreenProps<'Welcome'>) {
  return (
    <View useSafeArea flex bottom bg-white>
      <Text text30 grey90 marginB-128>
        Unipool
      </Text>
      <Button block
              label={'Get Started'}
              backgroundColor={Colors.primary}
              square
              marginB-12
              onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});