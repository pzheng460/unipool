import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import {Card, Checkbox, Text, TextInput} from "react-native-paper";
import {Button} from "../components";
import React, {useContext, useState} from "react";
import {RootStackScreenProps} from "../navigation/types";
import {auth, db} from "../configs/firebase/FirebaseConfig";
import {useSendEmailVerification, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {DummyDataContext, DummyDataDispatch} from "../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../reducer/ActionType";
import {useLoading} from "../contexts/LoadingContext";

const logo = require("../assets/icon.png");
export default function LoginScreen({route, navigation}: RootStackScreenProps<'Login'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const [remember, setRemember] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useLoading();

  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;
  const data = useContext(DummyDataContext) as GlobalData;

  const [
    signInWithEmailAndPassword,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [sendEmailVerification, sending, error2] = useSendEmailVerification(auth);
  function onCheckRemember() {
    const prevRemember = remember;
    setRemember(!prevRemember);
  }

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

  function handleLogin() {
    Keyboard.dismiss();
    setLoading(true);
    signInWithEmailAndPassword(email, password)
      .catch(error => {
        Alert.alert(error.message);
        setLoading(false);
      })
      .then((user) => {
        if (user !== undefined) {
          console.log("Verified: " + user.user.emailVerified);

          const uid = user.user.uid;
          getDoc(doc(db, "users", uid))
            .then((res) => {
              if (res.exists()) {
                // console.log(res.data());
                const userData = res.data();
                dispatch({
                  type: ActionTypes.FETCH_USER,
                  user: {
                    ...data.user,
                    id: uid,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    gender: userData.gender,
                    pastTrips: userData.pastTrips,
                    upcomingTrips: userData.upcomingTrips,
                    rating: userData.rating,
                    numOfRatings: userData.numOfRatings,
                  },
                });
              } else {
                console.log("User does not exist");
              }
              setLoading(false);
              navigation.replace("Root");
            })
            .catch((error) => {
              console.log(error);
              Alert.alert("Connection Error");
              setLoading(false);
            })
        }
        // } else {
        //   if (error) {
        //     console.log(error.message);
        //     let title;
        //     let msg = undefined;
        //     if (error.message === 'Firebase: Error (auth/invalid-email).') {
        //       title = 'Your email or password is incorrect.';
        //     } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
        //       title = 'Your email or password is incorrect.';
        //     } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
        //       title = 'Account does not exist';
        //       msg = 'Please sign up.'
        //     } else if (error.message === 'Firebase: Error (auth/internal-error).') {
        //       title = 'Your email or password is incorrect.'
        //     } else {
        //       title = error.message;
        //     }
        //     Alert.alert(title, msg,[
        //       {text: 'OK', onPress: () => console.log('OK Pressed')},
        //     ]);
        //   } else {
        //     Alert.alert("Login Failed, please check your connection.");
        //   }
        // }
      });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{flex: 1}}>
        {/*<View*/}
        {/*  style={{*/}
        {/*      position: "absolute",*/}
        {/*      backgroundColor: "#222A45",*/}
        {/*      width: "100%",*/}
        {/*      top: 0,*/}
        {/*      height: "66.6%",*/}
        {/*      left: 0,*/}
        {/*      right: 0}}*/}
        {/*>*/}
        {/*</View>*/}
        <View style={{
          paddingTop: headerHeight,
          paddingBottom: insets.bottom,
          marginLeft: 12,
          marginRight: 12,
          flex: 1,
          alignItems: "center",
          justifyContent: 'center',
          gap: 24,
        }}>
          <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: 32}}>
            <Image source={logo} style={{width: 250, height: 100}}/>
            {/*<Text variant={"headlineMedium"} style={{fontWeight: "600"}}> Unipool </Text>*/}
          </View>
          <KeyboardAvoidingView behavior={"position"}>
            <Card style={{marginRight: 'auto', marginLeft: 'auto', marginTop:  Dimensions.get('window').height / 8 - 32, minWidth: "100%"}}>
              <Card.Content>
                <View>
                  <TextInput
                    label={"Email Address"}
                    autoComplete={"email"}
                    autoFocus
                    maxLength={50}
                    onChangeText={(v) => setEmail(v)}
                    /* @ts-ignore */
                    enterKeyHint={"next"}
                    autoCapitalize={"none"}
                  />
                </View>
                <View style={{marginTop: 16}}>
                  <TextInput
                    label={"Password"}
                    autoComplete={"password"}
                    maxLength={50}
                    right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => onPressEye()}/>}
                    keyboardType={handelKeyboardVisible(showPassword)}
                    onChangeText={(v) => setPassword(v)}
                    onBlur={() => setShowPassword(false)}
                    /* @ts-ignore */
                    enterKeyHint={"done"}
                    secureTextEntry={!showPassword}
                  />
                </View>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 8,
                  marginBottom: 8,
                }}>
                  <Text style={{marginRight: -2}}>Remember Me</Text>
                  <Checkbox.Android
                    status={remember ? "checked" : "unchecked"}
                    onPress={() => onCheckRemember()}
                  />
                  <View style={{flexDirection: "row", flex: 1, justifyContent: "flex-end"}}>
                    <TouchableOpacity>
                      <Text>Use FaceID</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Button onPress={() => {handleLogin()}}>Sign In</Button>
                </View>
              </Card.Content>
            </Card>
          </KeyboardAvoidingView>
          <Button style={{marginBottom: Dimensions.get('window').height / 10}} mode={"text"} labelStyle={{fontSize: 16}} contentStyle={{height: 38}} onPress={() => {}}>
            Forget User ID / Password?
          </Button>
          <View style={{
            flexDirection: "row",
            position: "absolute",
            bottom: insets.bottom + 8,
          }}>
            <Button
              mode={"text"}
              labelStyle={{fontSize: 16}}
              contentStyle={{height: 38}}
              onPress={() => {
                dispatch({
                  type: ActionTypes.INIT_USER,
                });
                navigation.navigate("OnBoardBegin");
              }}
            >
              Sign Up
            </Button>
            <Button mode={"text"} labelStyle={{fontSize: 16}} contentStyle={{height: 38}} onPress={() => {}}>
              Contact Us
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}