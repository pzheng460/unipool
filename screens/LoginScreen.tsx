import {StyleSheet, TextInput} from "react-native";
import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import {AntDesign} from '@expo/vector-icons';
import {useState} from "react";
import {RootStackScreenProps} from "../types";
import {auth} from "../configs/firebase/FirebaseConfig";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {SafeAreaView} from "react-native-safe-area-context";

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

    function handleLogin() {
        signInWithEmailAndPassword(email, password);
        if (user) {navigation.navigate('Home')}
        if (error) {console.log(error.message)}
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 2}}>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 48, fontFamily: "Oceanwide-Semibold"}}>UniPool</Text>
                </View>
            </View>

            <View style={{flex: 4}}>
                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                    <Text
                        style={{color: "#10274C", fontSize: 30, fontWeight: "500", fontFamily: "Oceanwide-Semibold"}}>Login</Text>
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

                <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 5}}>
                    <Text style={{fontFamily: "Oceanwide-Semibold", fontWeight: "200", fontSize: 14, color: "#6C757D"}}>
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
        fontFamily: "Oceanwide-Semibold",
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 16
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontFamily: "Oceanwide-Semibold",
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 16
    }
});