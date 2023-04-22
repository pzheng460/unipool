import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {Button} from "../../components";
import {RootStackScreenProps} from "../../navigation/types";
import React, {useContext, useState} from "react";
import {DummyDataContext, DummyDataDispatch} from "../../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../../reducer/ActionType";

export default function OnBoardScreenEmail({route, navigation}: RootStackScreenProps<'OnBoardEmail'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const data = useContext(DummyDataContext) as GlobalData;
  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;
  const [email, setEmail] = useState<string>(data.user.email);

  function handleEmailSubmit() {
    dispatch({
      type: ActionTypes.UPDATE_EMAIL_ADDRESS,
      email: email,
      eduEmail: email,
    })
    navigation.navigate("OnBoardPassword");
  }

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
              Email Verification
            </Text>
          </View>
          <View>
            <Text variant={"bodyLarge"}>
              To ensure you are a college student, please input and verify your .edu email address.
            </Text>
          </View>
          <View>
            <TextInput
              autoFocus
              label={"Email Address"}
              autoComplete={"email"}
              maxLength={50}
              onChangeText={(v) => setEmail(v)}
              keyboardType={"email-address"}
              /* @ts-ignore */
              enterKeyHint={"next"}
              onSubmitEditing={() => handleEmailSubmit()}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={{paddingBottom: 32}} behavior={"position"}>
          <Button onPress={() => handleEmailSubmit()}>
            Continue
          </Button>
        </KeyboardAvoidingView >
      </View>
    </TouchableWithoutFeedback>
  );
}