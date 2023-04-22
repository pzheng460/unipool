import {Dimensions, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {
  Button,
  Chip,
  Colors,
  DateTimePicker,
  RadioButton,
  RadioGroup,
  Switch,
  Text,
  TextField,
  View
} from "react-native-ui-lib";
import {SetStateAction, useState} from "react";
import {RootStackScreenProps} from "../navigation/types";
import dayjs from "dayjs";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useHeaderHeight} from "@react-navigation/elements";
// import {DateTimePickerEvent} from "@react-native-community/datetimepicker";

let localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

export default function TripCreate1({route, navigation}: RootStackScreenProps<'TripCreate1'>) {

  const onKeyboard = () => {
    Keyboard.dismiss();
  }

  const {height, width} = Dimensions.get('window');

  const [roundTrip, setRoundTrip] = useState(true);
  const [extraSpace, setExtraSpace] = useState(true);
  const [startTime, setStartTime] = useState(new Date("1970-02-29T07:00:00.000Z"));
  const [backTime, setBackTime] = useState(new Date("1970-02-29T07:00:00.000Z"));

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onKeyboard()
      }}
    >

      <ScrollView
        contentContainerStyle={{...styles.container,
          paddingTop: headerHeight,
          paddingBottom: insets.bottom,
        }} bounces={false}
      >

        <View style={{flex: 5,
          flexDirection: 'column',
          backgroundColor: Colors.white,
          paddingTop: 20,
          paddingBottom: 20
        }}>
          {/*start & destination*/}

          <View style={{
            flex: 2,
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight: 40,
            paddingLeft: 40,
            marginBottom: 10
          }}>
            {/*start input*/}
            <View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <Chip
                  backgroundColor={Colors.background2}
                  label={'From'}
                  // labelStyle={{fontSize: 10}}
                  containerStyle={{borderWidth: 0, marginRight: 15, marginLeft: -15}}
                  size={{width: 60, height: 32}}
                  useSizeAsMinimum={true}
                ></Chip>
              </View>
              <View style={{flex: 5}}>
                <TextField
                  // floatingPlaceholder
                  fieldStyle={{
                    backgroundColor: Colors.background2,
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 0,
                    maxWidth: 320,
                  }}
                  placeholder={'Where do you start'}
                  // floatingPlaceholder
                  style={{fontSize: 18}}
                />
              </View>
            </View>
            {/*destination input*/}
            {/*这里hard code了*/}
            <View marginT-8 style={{flex: 5, flexDirection: 'row', alignItems: 'center',}}>
              <View style={{flex: 1}}>
                <Chip
                  backgroundColor={Colors.background2}
                  label={'To'}
                  // labelStyle={{fontSize: 10}}
                  containerStyle={{borderWidth: 0, marginRight: 15, marginLeft: -15}}
                  size={{width: 60, height: 32}}
                  useSizeAsMinimum={true}
                ></Chip>
              </View>
              <View style={{flex: 5}}>
                <TextField
                  // floatingPlaceholder
                  fieldStyle={{
                    backgroundColor: Colors.background2,
                    padding: 8,
                    borderRadius: 10,
                    borderWidth: 0,
                    maxWidth: 320,
                  }}
                  placeholder={'Where do you want to go'}
                  // floatingPlaceholder
                  style={{fontSize: 18}}
                />
              </View>
            </View>
          </View>

          {/*round trip and time*/}
          <View style={{
            flex: 10,
            paddingLeft: 20,
            paddingRight: 20
          }}>
            <View row
                  style={{flex: 1, alignItems: 'center', borderRadius: 10, marginTop: 16}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text text70> Round Trip </Text>
                <Switch
                  style={{
                    marginTop: 5,
                  }}
                  onColor={Colors.primary}
                  offColor={Colors.grey50}
                  width={64}
                  height={36}
                  thumbSize={32}
                  value={roundTrip}
                  onValueChange={() => {
                    setRoundTrip(!roundTrip);
                  }}
                />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text text70> Extra Luggage Space </Text>
                <Switch
                  style={{
                    marginTop: 5,
                  }}
                  onColor={Colors.primary}
                  offColor={Colors.grey50}
                  width={64}
                  height={36}
                  thumbSize={32}
                  value={extraSpace}
                  onValueChange={() => {
                    setExtraSpace(!extraSpace);
                  }}
                />
              </View>

            </View>
            <View row style={{
              flex: 3,
              alignItems: 'center',
              paddingTop: -50,
              marginTop: 5,
              // backgroundColor: Colors.grey80,
              borderRadius: 10,

            }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text marginT-10 $textDefault text65> Co-rider Number</Text>
                <RadioGroup>
                  <RadioButton marginT-10 value={2} label={'2'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                  <RadioButton marginT-5 value={3} label={'3'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                  <RadioButton marginT-5 value={4} label={'4'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                  <RadioButton marginT-5 value={5} label={'More than 4'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                </RadioGroup>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text marginT-10 $textDefault text65> Initial Passenger</Text>
                <RadioGroup>
                  <RadioButton marginT-10 value={1} label={'1'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                  <RadioButton marginT-5 value={2} label={'2'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                  <RadioButton marginT-5 value={3} label={'3'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                  <RadioButton marginT-5 value={4} label={'More than 3'} color={Colors.grey20}
                               style={{borderColor: Colors.black}}
                  />
                </RadioGroup>
              </View>
            </View>
            <View marginT-10 style={{flex: 2,  borderRadius: 10}}>
              <View style={{
                flex: 1,
                justifyContent: 'space-evenly',
                // backgroundColor: Colors.grey80,
                borderRadius: 10,
                alignItems: 'center'
              }}>
                <Text text65>Departure Time</Text>
                <DateTimePicker placeholder={startTime.getFullYear() > 1970 ? dayjs(backTime).format('llll') : 'Select Time'} mode={'datetime'}
                                minimumDate={new Date()} minuteInterval={30}
                                style={{fontSize: 22}}
                                date={startTime}
                                onChange={(startTime: SetStateAction<Date>) => {setStartTime(startTime);}}
                                containerStyle={{height:20}}
                />
              </View>
              <View style={{
                display: roundTrip ? 'flex' : 'none',
                flex: 1,
                justifyContent: 'space-evenly',
                // backgroundColor: Colors.grey80,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 8,
              }}>
                <Text text65>Return Time</Text>
                <DateTimePicker placeholder={backTime.getFullYear() > 1970 ? dayjs(backTime).format('llll') : 'Select Time'} mode={'datetime'}
                                minimumDate={new Date()} minuteInterval={30}
                                style={{fontSize: 22}}
                                date={backTime}
                                onChange={(backTime: SetStateAction<Date>) => {setBackTime(backTime);}}
                                containerStyle={{height:20}}
                />
              </View>
            </View>
          </View>

        </View>

        {/*add a button to next page*/}
        <View style={{
          flex: 2,
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <Button label={'Cancel'}
                  backgroundColor={Colors.grey30}
                  square
                  container
                  onPress={() => navigation.goBack()}
            // style={{height: height/15, borderRadius:15}}

          />
          <Button label={'Create'}
            // labelStyle={{ fontStyle: }}
                  text41
                  backgroundColor={Colors.primary}
                  square
                  onPress={() => navigation.goBack()}
            // style={{height: height/15, borderRadius:15, }}
          />
        </View>

      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',

  },
  loginWithGoogleText: {
    color: "#FFF",
    fontFamily: "Oceanwide-Semibold",
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 18,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontFamily: "Oceanwide-Semibold",
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 18,
  }
});
