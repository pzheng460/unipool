import {useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import {auth} from "../configs/firebase/FirebaseConfig";
import {RootStackScreenProps} from "../types";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";

const {TextField} = Incubator;


export default function RegisterScreen({navigation}: RootStackScreenProps<'Register'>) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleRegister() {
        createUserWithEmailAndPassword(email, password);
        if (user) {navigation.navigate('Home')}
        if (error) {
            console.log(error.message);
            navigation.navigate('Register');
        }
    }

    return (
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
                        placeholder={'Email'}
                        onChangeText={(v: string) => setEmail(v)}
                        validateOnChange
                        validate={['email']}
                        validationMessage={['Email is invalid']}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 16,
                            borderRadius: 8,
                            borderColor: 'grey',
                            borderWidth: 1
                        }}
                        validationMessagePosition={'bottom'}
                        enableErrors
                    />
                </View>

                <View style={{marginTop: 0}}>
                    <TextInput
                        placeholder={'Password'}
                        onChangeText={(v) => setPassword(v)}
                        secureTextEntry={true}
                        style={{backgroundColor: "#FFFFFF", padding: 16,
                            borderRadius: 8,borderColor: 'grey',
                            borderWidth: 1,}}
                    />
                </View>

                <View style={{marginTop: 20}}>
                    <TextInput
                        placeholder={'Retype Password'}
                        // onChangeText={(v) => setPassword(v)}
                        secureTextEntry={true}
                        style={{backgroundColor: "#FFFFFF", padding: 16,
                            borderRadius: 8,borderColor: 'grey',
                            borderWidth: 1,}}
                    />
                </View>
            </View>
            <View style={{flex: 1}}>
                <Button style={{backgroundColor: Colors.primary, borderRadius: 8}} onPress={() => handleRegister()}>
                    <Text style={styles.loginButtonText}>Create Account</Text>
                </Button>
            </View>
        </View>
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
    loginWithGoogleText: {
        color: "#6C757D",
        fontFamily: "Oceanwide-Semibold",
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 13
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontFamily: "Oceanwide-Semibold",
        paddingTop: 3,
        paddingBottom: 3
    }
});