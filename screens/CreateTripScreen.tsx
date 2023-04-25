import {Alert, Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, View} from "react-native";
import React, {SetStateAction, useContext, useRef, useState} from "react";
import {RootStackScreenProps} from "../navigation/types";
import dayjs from "dayjs";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useHeaderHeight} from "@react-navigation/elements";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../configs/firebase/FirebaseConfig";
import {Checkbox, SegmentedButtons, Text, TextInput} from "react-native-paper";
import {DateTimePicker} from "react-native-ui-lib";
import {Button} from "../components";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {useLoading} from "../contexts/LoadingContext";
import {DummyDataContext, DummyDataDispatch} from "../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../reducer/ActionType";

let localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

export default function CreateTripScreen({route, navigation}: RootStackScreenProps<'TripCreate1'>) {

  const onKeyboard = () => {
    Keyboard.dismiss();
  }

  const {height, width} = Dimensions.get('window');

  const [roundTrip, setRoundTrip] = useState(true);
  const [sameGender, setSameGender] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startTime, setStartTime] = useState(new Date("1970-02-29T07:00:00.000Z"));
  const [backTime, setBackTime] = useState(new Date("1970-02-29T07:00:00.000Z"));
  const [seatsMax, setSeatsMax] = useState(4);
  const [seatsTaken, setSeatsTaken] = useState(1);

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const lastNameRef = useRef();

  const [user,] = useAuthState(auth);
  const [loading, setLoading] = useLoading();

  const data = useContext(DummyDataContext) as GlobalData;
  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;

  async function handleCreatTrip() {
    if ((roundTrip && startTime > backTime) || from === "" || from === undefined || from.trim().length <= 0 ||
      to === "" || to === undefined || to.trim().length <= 0
    ) {
      Alert.alert("Please Input Valid Location and Time");
      return;
    }
    const newTrip = {
      from: from.trim(),
      to: to.trim(),
      type: "upcoming",
      date: dayjs(startTime).unix(),
      returnDate: roundTrip ? dayjs(backTime).unix() : null,
      roundTrip: roundTrip,
      sameGender: sameGender,
      riders: [user?.uid],
      seatsMax: seatsMax,
      seatsTaken: 1,
    }
    console.log(newTrip);

    const upcomingTrips: string[] = [];
    data.user.upcomingTrips.forEach(upcomingTrip => {
      upcomingTrips.push(upcomingTrip.id);
    });

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "trips"), {
        ...newTrip
      });

      await updateDoc(doc(db, "users", data.user.id), {
        upcomingTrips: [...upcomingTrips, docRef.id],
      });

      dispatch({
        type: ActionTypes.ADD_UPCOMING_TRIP,
        trip: {
          ...newTrip,
          id: docRef.id
        }
      })

    } catch (e) {
      console.log(e);
      Alert.alert("Connection Error");
    } finally {
      setLoading(false);
      Alert.alert("Success");
      navigation.goBack();
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onKeyboard()
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: insets.bottom,
          paddingLeft: 24,
          paddingRight: 24,
          flex: 1
        }} bounces={false}
      >
        <View style={{flex: 1, gap: 16}}>
          <View>
            <Text variant={"headlineMedium"} style={{fontWeight: "bold"}}>
              Creat Trip
            </Text>
          </View>
          <View>
            <TextInput
              autoFocus
              label={"From"}
              maxLength={50}
              onChangeText={(v) => setFrom(v)}
              /* @ts-ignore */
              enterKeyHint={"next"}
              /* @ts-ignore */
              onSubmitEditing={() => lastNameRef.current.focus()}
            />
          </View>
          <View>
            <TextInput
              label={"To"}
              maxLength={50}
              onChangeText={(v) => setTo(v)}
              /* @ts-ignore */
              enterKeyHint={"next"}
              onSubmitEditing={() => Keyboard.dismiss()}
              /* @ts-ignore */
              ref={lastNameRef}
            />
          </View>
          <View style={{gap: 8}}>
            <Text variant={"bodyLarge"}>
              Maximum Passengers
            </Text>
            <SegmentedButtons
              value={seatsMax.toString()}
              onValueChange={(v) => setSeatsMax(parseInt(v))}
              buttons={[
                {
                  value: '2',
                  label: '2',
                },
                {
                  value: '3',
                  label: '3',
                },
                {
                  value: '4',
                  label: '4',
                },
                {
                  value: '5',
                  label: '5',
                },
              ]}
            />
          </View>
          <View style={{flexDirection: "row"}}>
            <View style={{flexDirection: "row", alignItems:"center"}}>
              <Text variant={"bodyLarge"}>
                Same Gender
              </Text>
              <Checkbox.Android
                status={sameGender ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSameGender(!sameGender);
                }}
              />
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text variant={"bodyLarge"}>
                Round Trip
              </Text>
              <Checkbox.Android
                status={roundTrip ? 'checked' : 'unchecked'}
                onPress={() => {
                  setRoundTrip(!roundTrip);
                }}
              />
            </View>
          </View>
          <View style={{gap: 16}}>
            <View style={{
              justifyContent: 'space-evenly',
              // backgroundColor: Colors.grey80,
              borderRadius: 10,
              alignItems: 'center'
            }}>
              <Text variant={"bodyLarge"}>Departure Time</Text>
              <DateTimePicker placeholder={startTime.getFullYear() > 1970 ? dayjs(startTime).format('llll') : 'Select Time'} mode={'datetime'}
                              minimumDate={new Date()} minuteInterval={30}
                              style={{fontSize: 22}}
                              date={startTime}
                              onChange={(startTime: SetStateAction<Date>) => {setStartTime(startTime);}}
                              containerStyle={{height:20}}
              />
            </View>
            {
              roundTrip &&
                <View style={{
                  justifyContent: 'space-evenly',
                  // backgroundColor: Colors.grey80,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                    <Text variant={"bodyLarge"}>Return Time</Text>
                    <DateTimePicker placeholder={backTime.getFullYear() > 1970 ? dayjs(backTime).format('llll') : 'Select Time'} mode={'datetime'}
                                    minimumDate={new Date()} minuteInterval={30}
                                    style={{fontSize: 22}}
                                    date={backTime}
                                    onChange={(backTime: SetStateAction<Date>) => {setBackTime(backTime);}}
                                    containerStyle={{height:20}}
                    />
                </View>
            }
          </View>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 32}}>
          <Button mode={"text"}
                  onPress={() => navigation.goBack()}
          >
            Cancel
          </Button>
          <Button style={{right: 0}}
                  onPress={() => handleCreatTrip()}
          >
            Create
          </Button>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

