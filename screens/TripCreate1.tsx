import {Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
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
import {RootStackScreenProps} from "../types";
// import {DateTimePickerEvent} from "@react-native-community/datetimepicker";

export default function TripCreate1({route, navigation}: RootStackScreenProps<'TripCreate1'>) {

    const onKeyboard = () => {
        Keyboard.dismiss();
    }

    const {height, width} = Dimensions.get('window');

    const [roundTrip, setRoundTrip] = useState(true);
    const [extraSpace, setExtraSpace] = useState(true);
    const [startTime, setStartTime] = useState(new Date("1970-02-29T07:00:00.000Z"));
    const [backTime, setBackTime] = useState(new Date("1970-02-29T07:00:00.000Z"));

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onKeyboard()
            }}
        >

            <View flex style={styles.container}>

                <View style={{flex: 5, flexDirection: 'column'}}>
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
                                    backgroundColor={'#bff4f4'}
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
                                    backgroundColor={'#bff4f4'}
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
                              style={{flex: 1, alignItems: 'center', backgroundColor: Colors.grey60, borderRadius: 10}}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 12,
                                }}> Round Trip </Text>
                                <Switch
                                    style={{
                                        marginTop: 5,
                                    }}
                                    onColor={Colors.grey20}
                                    offColor={Colors.grey60}
                                    value={roundTrip}
                                    onValueChange={() => {
                                        setRoundTrip(!roundTrip);
                                    }}
                                />
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 12
                                }}> Extra Luggage Space </Text>
                                <Switch
                                    style={{
                                        marginTop: 5,
                                    }}
                                    onColor={Colors.grey20}
                                    offColor={Colors.grey60}
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
                            backgroundColor: Colors.grey60,
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
                        <View row marginT-10 style={{flex: 2, backgroundColor: Colors.grey60, borderRadius: 10}}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'space-evenly',
                                backgroundColor: Colors.grey60,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}>
                                <Text text65>For Start Time</Text>
                                <DateTimePicker placeholder={startTime.getFullYear() > 1970 ? '✔' : 'Click'} mode={'datetime'}
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
                                backgroundColor: Colors.grey60,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}>
                                <Text text65>For Back Time</Text>
                                <DateTimePicker placeholder={backTime.getFullYear() > 1970 ? '✔' : 'Click'} mode={'datetime'}
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
                    alignItems: 'center'
                }}>
                    <Button label={'Cancel'}
                            backgroundColor={Colors.$textDanger}
                            square
                            container
                            style={{height: height/15, borderRadius:15}}

                    />
                    <Button label={'Create'}
                            // labelStyle={{ fontStyle: }}
                            text41
                            backgroundColor={Colors.primary}
                            square
                            marginL-20
                            marginR-20
                            style={{height: height/15, borderRadius:15, }}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: "column",
        paddingTop: 100,
        justifyContent: 'center'

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
