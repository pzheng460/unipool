import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View} from "react-native";
import {HelperText, Text, TextInput} from "react-native-paper";
import {Button} from "../../components";
import {RootStackScreenProps} from "../../navigation/types";
import React, {useContext, useRef, useState} from "react";
import {DummyDataContext, DummyDataDispatch} from "../../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../../reducer/ActionType";

export default function OnBoardScreenEmail({route, navigation}: RootStackScreenProps<'OnBoardEmail'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const data = useContext(DummyDataContext) as GlobalData;
  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;
  const [email, setEmail] = useState<string>(data.user.email);
  const inputRef = useRef(null);

  function handleEmailSubmit() {
    if (!hasErrors()) {
      dispatch({
        type: ActionTypes.UPDATE_EMAIL_ADDRESS,
        email: email,
      })
      Keyboard.dismiss();
      navigation.navigate("OnBoardPassword");
    }
  }

  const hasErrors = () => {
    return !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.edu+$/.test(email);
  };

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
              ref={inputRef}
              autoFocus
              label={"Email Address"}
              autoComplete={"email"}
              maxLength={50}
              onChangeText={(v) => setEmail(v)}
              keyboardType={"email-address"}
              inputMode={"email"}
              autoCapitalize={"none"}
              /* @ts-ignore */
              enterKeyHint={"next"}
              onSubmitEditing={() => handleEmailSubmit()}
              error={hasErrors()}
            />
            <HelperText type={"error"} visible={hasErrors()}>
              Email Address is Invalid
            </HelperText>
          </View>
        </View>
        <KeyboardAvoidingView style={{marginBottom: 24, paddingBottom: 8}} behavior={"position"}>
          <Button onPress={() => handleEmailSubmit()}>
            Continue
          </Button>
        </KeyboardAvoidingView >
      </View>
    </TouchableWithoutFeedback>
  );
}