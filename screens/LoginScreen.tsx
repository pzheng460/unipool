import {Alert, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback} from "react-native";
import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import {AntDesign} from '@expo/vector-icons';
import {useState} from "react";
import {RootStackScreenProps} from "../types";
import {auth} from "../configs/firebase/FirebaseConfig";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";

const {TextField} = Incubator;

export default function LoginScreen({route, navigation}: RootStackScreenProps<'Login'>) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const onKeyboard = () => {
        Keyboard.dismiss();
    }

    function handleLogin() {
        signInWithEmailAndPassword(email, password);

        if (error) {
            console.log(error.message);
            let title;
            let msg = undefined;
            if (error.message === 'Firebase: Error (auth/invalid-email).') {
                title = 'Your email or password is incorrect.';
            } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                title = 'Your email or password is incorrect.';
            } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                title = 'Account does not exist';
                msg = 'Please sign up.'
            } else if (error.message === 'Firebase: Error (auth/internal-error).') {
                title = 'Your email or password is incorrect.'
            } else {
                title = error.message;
            }
            Alert.alert(title, msg,[
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() =>{onKeyboard()}}
        >
        <View style={styles.container}>
            <View style={{flex: 2}}>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{color: Colors.primary, fontSize: 48, fontWeight: 'bold'}}>UniPool</Text>
                </View>
            </View>

            <View style={{flex: 4}}>
                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                    <Text
                        style={{color: Colors.primary, fontSize: 30, fontWeight: 'bold'}}>Login</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <TextField
                        placeholder={'Email'}
                        onChangeText={(v: string) => setEmail(v)}
                        fieldStyle={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'gray',
                            borderWidth: 2,
                        }}
                        style={{fontSize: 16}}
                        enableErrors
                    />
                </View>

                <View style={{marginTop: 0}}>
                    <TextInput
                        placeholder={'Password'}
                        onChangeText={(v) => setPassword(v)}
                        secureTextEntry={true}
                        style={{backgroundColor: Colors.background,
                            padding: 12,
                            borderRadius: 5,
                            borderColor: 'gray',
                            borderWidth: 2,
                            fontSize: 16,
                        }}
                    />
                </View>

                <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: "#6C757D"}}>
                        Forgot Password?
                    </Text>
                </View>
            </View>

            <View style={{flex: 2}}>
                <View style={{marginTop: 10}}>
                    <Button square onPress={() => handleLogin()}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Button>
                </View>

                <View style={{marginTop: 10}}>
                    <Button square>
                        <AntDesign name="googleplus" size={24} color="#FFF" style={{marginRight: 10}}/>
                        <Text style={styles.loginWithGoogleText}>Login With Google</Text>
                    </Button>
                </View>

                <View style={{flexDirection: "row", justifyContent: "center", paddingTop: 10}}>
                    <Text style={{color: "#6C757D", fontSize: 16}}>Do not have an account?</Text>
                    <Text style={{marginLeft: 5, color: "rgba(64,147,227,0.88)", fontWeight: "500", fontSize: 16}}
                          onPress={() => {
                              navigation.navigate('Register')
                          }}
                    >
                        Sign Up
                    </Text>
                </View>
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
    loginWithGoogleText: {
        color: "#FFF",
        // fontFamily: "Oceanwide-Semibold",
        fontWeight: 'bold',
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 18,
    },
    loginButtonText: {
        color: "#FFFFFF",
        // fontFamily: "Oceanwide-Semibold",
        fontWeight: 'bold',
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 18,
    }
});