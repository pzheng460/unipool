import {Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View} from "react-native";
import {RootStackScreenProps} from "../../navigation/types";
import {SegmentedButtons, Text, TextInput} from "react-native-paper";
import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Button} from "../../components";
import React, {RefObject, useContext, useEffect, useRef, useState} from "react";
import {DummyDataContext, DummyDataDispatch} from "../../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../../reducer/ActionType";

export default function OnBoardScreenBegin({route, navigation}: RootStackScreenProps<'OnBoardBegin'>) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const data = useContext(DummyDataContext) as GlobalData;
  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;
  const [firstname, setFirstname] = useState<string>((data.user.firstName).trim());
  const [lastname, setLastname] = useState<string>((data.user.lastName).trim());
  const [gender, setGender] = useState<string>(data.user.gender);

  const lastNameRef= useRef();
  function handleSubmit() {
    /**
     * TODO: Check legal name format and gender selection.
     */
    if (firstname.trim().length <= 0
      || lastname.trim().length <= 0
      || gender === undefined || gender == "") {
      Alert.alert("Please Input All Field Correctly");
      return;
    }
    dispatch({
      type: ActionTypes.UPDATE_GENDER,
      gender: gender,
    });
    dispatch({
      type: ActionTypes.UPDATE_FULL_NAME,
      firstName:firstname,
      lastName: lastname,
    })
    navigation.navigate("OnBoardEmail");
  }

  // useEffect(() => {
  //   dispatch({
  //     type: ActionTypes.INIT_USER,
  //   })
  // }, []);

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
              Welcome
            </Text>
          </View>
          <View>
            <Text variant={"bodyLarge"}>
              It's happy to see you today! We need to know a little bit more about you.
            </Text>
          </View>
          <View>
            <TextInput
              autoFocus
              label={"First Name"}
              autoComplete={"name-given"}
              maxLength={50}
              onChangeText={(v) => setFirstname(v.trim())}
              value={firstname.trim()}
              /* @ts-ignore */
              enterKeyHint={"next"}
              /* @ts-ignore */
              onSubmitEditing={() => lastNameRef.current.focus()}
            />
          </View>
          <View>
            <TextInput
              label={"Last Name"}
              autoComplete={"name-family"}
              maxLength={50}
              onChangeText={(v) => setLastname(v.trim())}
              value={lastname.trim()}
              /* @ts-ignore */
              enterKeyHint={"next"}
              onSubmitEditing={() => Keyboard.dismiss()}
              /* @ts-ignore */
              ref={lastNameRef}
            />
          </View>
          <View>
            <SegmentedButtons
              value={gender}
              onValueChange={setGender}
              buttons={[
                {
                  value: 'male',
                  label: 'Male',
                },
                {
                  value: 'female',
                  label: 'Female',
                },
                {
                  value: 'other',
                  label: 'Other',
                },
              ]}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={{paddingBottom: 32}} behavior={"position"}>
          <Button onPress={() => handleSubmit()}>
            Continue
          </Button>
        </KeyboardAvoidingView >
      </View>
    </TouchableWithoutFeedback>
  );
}