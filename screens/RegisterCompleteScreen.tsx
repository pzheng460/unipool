import {RootStackScreenProps} from "../navigation/types";
import {Alert, Keyboard, TouchableWithoutFeedback, View, ActivityIndicator} from "react-native";
import {Text} from "react-native-paper";
import {Button} from "../components";
import React, {useEffect, useState} from "react";
import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {auth} from "../configs/firebase/FirebaseConfig";
import {useAuthState, useSendEmailVerification} from "react-firebase-hooks/auth";

export default function RegisterCompleteScreen({navigation}: RootStackScreenProps<'RegisterComplete'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const [countDown, setCountDown] = useState<number>(45);
  const [block, setBlock] = useState<boolean>(true);

  const [sendEmailVerification, sending, error2] = useSendEmailVerification(auth);

  useEffect(() => {
    handleSendCode();
  }, []);

  // Not good, need a global timer.
  useEffect(() => {
    if (countDown <= 0) {
      setCountDown(0);
      setBlock(false);
    }
  }, [countDown]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (block) {
      setCountDown(45);
      interval = setInterval(() => {
        setCountDown((sec) => sec - 1);
      }, 1000);
    } else if (!block || countDown <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [block]);

  async function handleSendCode() {
    setBlock(true);
    const success = await sendEmailVerification();
    if (success) {
      Alert.alert("Email Send");
    } else {
      setBlock(false);
      Alert.alert("System Error, please try again.");
    }
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
        <ActivityIndicator animating={sending} size={"large"} style={{position: "absolute",  top: "60%", alignSelf:"center"}}/>
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
        <View style={{gap: 16}}>
          <Button onPress={() => {handleSendCode()}} mode={"text"} disabled={block}>
            Resend Verification Email {block && "(" + countDown + "s)"}
          </Button>
          <Button onPress={() => {
            navigation.replace("Root");
          }}>
            Done
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}