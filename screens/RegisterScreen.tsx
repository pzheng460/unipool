import {useState} from "react";
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import {auth} from "../configs/firebase/FirebaseConfig";
import {RootStackScreenProps} from "../types";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";

const {TextField} = Incubator;


export default function RegisterScreen({navigation}: RootStackScreenProps<'Register'>) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onKeyboard = () => {
        Keyboard.dismiss();
    }

    function handleRegister() {
        let emailArr = email.split('.');
        let eduEmail = emailArr[emailArr.length-1] === 'edu';

        if (!eduEmail) {
            console.log('Not a student email');
        } else if (password != confirmPassword) {
            console.log('Password does not match');
        } else {
            createUserWithEmailAndPassword(email, password).then();
            if (error) {
                console.log(error.message);
                navigation.navigate('Register');
            }
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() =>{onKeyboard()}}
        >
        <View style={styles.container}>
            <View style={{flex: 4}}>
                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                    <Text
                        style={{color: "#10274C", fontSize: 30, fontWeight: "500", fontFamily: "Oceanwide-Semibold"}}>
                        Sign Up
                    </Text>
                </View>

                <View style={{marginTop: 20}}>
                    <TextField
                        placeholder={'Student Email Address'}
                        onChangeText={(v: string) => setEmail(v)}
                        validateOnChange
                        validate={['required', 'email', (value: string) => {
                            let valueArr = value.split(".");
                            return valueArr[valueArr.length-1] === 'edu';
                        }]}
                        validationMessage={['Field is required', 'Enter a valid email', 'Enter a valid student email']}
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
                        placeholder={'Password'}
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
                        placeholder={'Confirm Password'}
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
        paddingTop: 200,
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