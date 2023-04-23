import {useState} from "react";
import {Alert, Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Button, Colors, Incubator, Picker, Text, View} from "react-native-ui-lib";
import {auth} from "../configs/firebase/FirebaseConfig";
import {RootStackScreenProps} from "../navigation/types";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";

const {TextField} = Incubator;


export default function RegisterScreen({navigation}: RootStackScreenProps<'Register'>) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const regName = /^[a-zA-Z]+$/;
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const onKeyboard = () => {
        Keyboard.dismiss();
    }

    function handleRegister() {
        let emailArr = email.split('.');
        let eduEmail = emailArr[emailArr.length-1] === 'edu';

        if (!regEmail.test(email) ||
            !eduEmail ||
            password.length < 6 ||
            password != confirmPassword ||
            firstName === '' ||
            lastName === '' ||
            !regName.test(firstName) ||
            !regName.test(lastName) ||
            gender === ''
        ) {
            Alert.alert('Please check all fields.');
        } else {
            // createUserWithEmailAndPassword(email, password).then(() => {
            //     if (error) {
            //         if (error.code === 'auth/email-already-in-use') {
            //             Alert.alert('Email address already in use.');
            //         } else {
            //             Alert.alert(error.message);
            //         }}
            //     else {
            //         // navigation.navigate('RegisterComplete');
            //     }
            // });
            createUserWithEmailAndPassword(email, password);
            if (error) {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Email address already in use.');
                } else {
                    Alert.alert(error.message);
                }
            } else {
                navigation.navigate('RegisterComplete');
            }
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() =>{onKeyboard()}}
        >
        <View style={styles.container}>
            <View style={{flex: 7}}>
                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                    <Text
                        style={{color: "#10274C", fontSize: 30, fontWeight: "500", fontFamily: "Oceanwide-Semibold"}}>
                        Sign Up
                    </Text>
                </View>

                <View style={{marginTop: 20}}>
                    <TextField
                        label={'Student Email Address'}
                        labelStyle={{fontSize:16, marginBottom:3}}
                        // placeholder={'Student Email Address'}
                        onChangeText={(v: string) => setEmail(v)}
                        validateOnChange

                        validate={['required', (value: string) => {
                            let valueArr = value.split(".");
                            return valueArr[valueArr.length-1] === 'edu' && regEmail.test(value);
                        }]}
                        validationMessage={['Field is required', 'Enter a valid student email']}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'grey',
                            borderWidth: 1,
                            fontSize: 16,
                        }}
                        validationMessagePosition={'bottom'}
                        enableErrors
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <TextField
                        label={'Password'}
                        labelStyle={{fontSize:16, marginBottom:3}}
                        onChangeText={(v: string) => setPassword(v)}
                        validateOnChange
                        secureTextEntry={true}
                        validate={['required', (value: string) => value.length > 5]}
                        validationMessage={['Field is required', 'Password is too short']}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'grey',
                            borderWidth: 1,
                            fontSize: 16,
                        }}
                        validationMessagePosition={'bottom'}
                        enableErrors
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <TextField
                        label={'Confirm Password'}
                        labelStyle={{fontSize:16, marginBottom:3}}
                        onChangeText={(v: string) => setConfirmPassword(v)}
                        validateOnChange
                        secureTextEntry={true}
                        validate={['required', (value: string) => value === password]}
                        validationMessage={['Field is required', 'Password does not match']}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'grey',
                            borderWidth: 1,
                            fontSize: 16,
                        }}
                        validationMessagePosition={'bottom'}
                        enableErrors
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <TextField
                        label={'First Name'}
                        labelStyle={{fontSize:16, marginBottom:3}}
                        onChangeText={(v: string) => setFirstName(v)}
                        validateOnChange
                        validate={['required', (value: string) => regName.test(value)]}
                        validationMessage={['Field is required', "Enter a valid name"]}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'grey',
                            borderWidth: 1,
                            fontSize: 16,
                        }}
                        validationMessagePosition={'bottom'}
                        enableErrors
                    />
                </View>

                <View style={{marginTop: 5}}>
                    <TextField
                        label={'Last Name'}
                        labelStyle={{fontSize:16, marginBottom:3}}
                        onChangeText={(v: string) => setLastName(v)}
                        validateOnChange
                        validate={['required', (value: string) => regName.test(value)]}
                        validationMessage={['Field is required', "Enter a valid name"]}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'grey',
                            borderWidth: 1,
                            fontSize: 16,
                        }}
                        validationMessagePosition={'bottom'}
                        enableErrors
                    />
                </View>

                <Picker
                    useWheelPicker
                    style={{backgroundColor: Colors.background,
                        marginTop: 5,
                        height:45,
                        padding: 12,
                        borderRadius: 5,
                        borderColor: 'grey',
                        borderWidth: 1,
                        fontSize: 14.5,
                    }}
                    label="Gender"
                    labelStyle={{fontSize:16, marginBottom:3}}
                    value={gender}
                    onChange={(v: string) => setGender(v)}
                    // renderPicker={() => {
                    //   return (
                    //     <WheelPicker
                    //         items={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]}
                    //         initialValue={'yes'}
                    //         onChange={() => console.log('changed')}
                    //         activeTextColor={Colors.black}
                    //         inactiveTextColor={Colors.grey70}
                    //     />
                    //   );
                    // }}
                    // topBarProps={{doneLabel: 'YES', cancelLabel: 'NO'}}
                >
                    <Picker.Item key='' value='' label=''/>
                    <Picker.Item key='male' value='male' label='Male'/>
                    <Picker.Item key='female' value='female' label='Female'/>
                </Picker>

            </View>
            <View style={{flex: 1}}>
                <Button style={{backgroundColor: Colors.primary, borderRadius: 8}} onPress={() => handleRegister()}>
                    <Text style={styles.loginButtonText}>Create Account</Text>
                </Button>
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
        padding: 40,
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontFamily: "Oceanwide-Semibold",
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 18
    }
});