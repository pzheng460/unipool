import {ActivityIndicator, Alert, View} from "react-native";
import {Text} from "react-native-paper";
import {Button} from "../components";
import React, {useEffect, useState} from "react";
import {auth} from "../configs/firebase/FirebaseConfig";
import {useSendEmailVerification} from "react-firebase-hooks/auth";

export default function RegisterCompleteScreen() {
  // const headerHeight = useHeaderHeight();
  // const insets = useSafeAreaInsets();

  const [countDown, setCountDown] = useState<number>(45);
  const [block, setBlock] = useState<boolean>(false);

  const [sendEmailVerification, sending, error2] = useSendEmailVerification(auth);

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
      <View style={{
        padding: 16,
      }}>
        <ActivityIndicator animating={sending} size={"large"} style={{position: "absolute",  top: "60%", alignSelf:"center"}}/>
        <View style={{gap: 16}}>
          <Text variant={"titleLarge"} style={{fontWeight: "600"}}>
            We've sent you an email with a verification link.
          </Text>
          <Text variant={"bodyLarge"}>
            Click the link to get verified as a student before your first login.
          </Text>
          <Button onPress={() => {handleSendCode()}} mode={"text"} disabled={block}>
            Resend Verification Email {block && "(" + countDown + "s)"}
          </Button>
        </View>
      </View>
  );
}