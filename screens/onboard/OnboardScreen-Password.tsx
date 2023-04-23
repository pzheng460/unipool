import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View} from "react-native";
import {HelperText, Text, TextInput} from "react-native-paper";
import {Button} from "../../components";
import {RootStackScreenProps} from "../../navigation/types";
import React, {useContext, useState} from "react";
import {DummyDataContext, DummyDataDispatch} from "../../AppContextWrapper";
import {DataActions, GlobalData} from "../../reducer/ActionType";
import {useCreateUserWithEmailAndPassword, useSignOut} from "react-firebase-hooks/auth";
import {auth, db} from "../../configs/firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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
  ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const hasErrors = () => {
    return password.length <= 5;
  };

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
    if (hasErrors()) {
      return;
    }
    const userEmail = data.user.email;
    createUserWithEmailAndPassword(userEmail, password)
      .catch(error => {
        Alert.alert(error.message);
      }
    )
      .then((res) => {
        console.log(res);
        if (res !== undefined) {
          const uid = res.user.uid;
          setDoc(doc(db, "users", uid), {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            gender: data.user.gender,
            email: data.user.email,
            pastTrips: [],
            rating: 5,
            numOfRatings: 1,
            upcomingTrips: [],
            comments: [""],
          }).then((res) => {
            // navigation.reset({
            //   index: 1,
            //   routes: [{name: "Root"}, {name: "RegisterComplete"}],
            // });
          })
            .catch((error) => {
              console.log(error);
            });
        } else {
          if (error) {
            Alert.alert('Registration Failed', error.code);
          } else {
            Alert.alert('Registration failed, please try again.');
          }
        }
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
                error={hasErrors()}
              />
              <HelperText type={"error"} visible={hasErrors()}>
                Password should be at least 6 digits
              </HelperText>
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