import {RootStackScreenProps} from "../types";
import {StyleSheet, View,} from "react-native";
import {Button, Colors, Text} from "react-native-ui-lib";

export default function RegisterCompleteScreen({navigation}: RootStackScreenProps<'RegisterComplete'>) {

    return (
        <View style={styles.container}>
            <View style={{flex: 7}}>
                <Text
                    style={{color: "#10274C", fontSize: 30, fontWeight: "500", fontFamily: "Oceanwide-Semibold"}}>
                    You Are All Set!
                </Text>

                <Text
                    style={{color: "#10274C", fontSize: 20, fontFamily: "Oceanwide", marginTop: 60}}>
                    You will receive an email with a verification link.
                    {'\n\n'}
                    Click the link to get verified as a student before your first login.
                </Text>
            </View>
            <View style={{flex: 1}}>
                <Button style={{backgroundColor: Colors.primary, borderRadius: 8}} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.button}>Done</Text>
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
        paddingTop: 100,
        padding: 40,
    },
    button: {
        color: "#FFFFFF",
        fontFamily: "Oceanwide-Semibold",
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 18
    }
});