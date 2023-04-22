import {RootStackScreenProps} from "../navigation/types";
import {Keyboard, TouchableWithoutFeedback, View} from "react-native";
import {Text} from "react-native-paper";
import {Button} from "../components";
import React, {useEffect} from "react";
import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function RegisterCompleteScreen({navigation}: RootStackScreenProps<'RegisterComplete'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    /**
     * Put statements you hope to execute after render here.
     */
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{
        paddingTop: headerHeight,
        paddingBottom: insets.bottom,
        paddingLeft: 24,
        paddingRight: 24,
        flex: 1,
      }}>
        <View style={{flex: 1, gap: 16}}>
          <View>
            <Text variant={"displaySmall"} style={{fontWeight: "bold"}}>
              All Set!
            </Text>
          </View>
          <View>
            <Text variant={"bodyLarge"}>
              You will receive an email with a verification link.
            </Text>
            <Text variant={"bodyLarge"}>
              Click the link to get verified as a student before your first login.
            </Text>
          </View>
        </View>
        <View>
          <Button onPress={() => navigation.navigate("Login")}>
            Done
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}