import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {Button} from "../../components";
import {RootStackScreenProps} from "../../navigation/types";
import React, {useContext, useState} from "react";
import {DummyDataContext, DummyDataDispatch} from "../../AppContextWrapper";
import {DataActions, GlobalData} from "../../reducer/ActionType";
import {useCreateUserWithEmailAndPassword, useSignOut} from "react-firebase-hooks/auth";
import {auth} from "../../configs/firebase/FirebaseConfig";

export default function OnBoardScreenPassword({route, navigation}: RootStackScreenProps<'OnBoardPassword'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const data = useContext(DummyDataContext) as GlobalData;
  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signOut,] = useSignOut(auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  function onPressEye() {
    const prevShowPassword = showPassword;
    setShowPassword(!prevShowPassword);
  }

  function handelKeyboardVisible(visible: boolean) {
    if (visible === true) {
      return Platform.OS === "ios" ? "ascii-capable" : "visible-password";
    } else {
      return "default";
    }
  }

  function handlePasswordSubmit() {
    const userEmail = data.user.email;
    createUserWithEmailAndPassword(userEmail, password)
      .catch(
      (error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email address already in use.');
        } else {
          Alert.alert(error.message);
        }
      }
    )
      .then((res) => {
        console.log(res);
        signOut().then((res) => {
          navigation.reset({
            index: 1,
            routes: [{name: "Welcome"}, {name: "RegisterComplete"}],
          });
        });
      });
    // navigation.reset({
    //   index: 1,
    //   routes: [{name: "Welcome"}, {name: "RegisterComplete"}],
    // })
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
              Set Password
            </Text>
          </View>
          <View>
            <Text variant={"bodyLarge"}>
              Please make sure it contains at least one uppercase letter and one special character.
            </Text>
          </View>
          <View>
            <View >
              <TextInput
                autoFocus
                label={"Password"}
                autoComplete={"password-new"}
                maxLength={50}
                right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => onPressEye()}/>}
                keyboardType={handelKeyboardVisible(showPassword)}
                onChangeText={(v) => setPassword(v)}
                onBlur={() => setShowPassword(false)}
                onSubmitEditing={() => handlePasswordSubmit()}
                /* @ts-ignore */
                enterKeyHint={"next"}
                secureTextEntry={!showPassword}
              />
            </View>
          </View>
        </View>
        <KeyboardAvoidingView style={{paddingBottom: 32}} behavior={"position"}>
          <Button onPress={() => handlePasswordSubmit()}>
            Continue
          </Button>
        </KeyboardAvoidingView >
      </View>
    </TouchableWithoutFeedback>
  );
}