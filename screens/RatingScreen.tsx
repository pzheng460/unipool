import {
    Button,
    Colors,
    View,
    TextField,
    Chip,
    Switch, Text, RadioButton, RadioGroup,DateTimePicker
} from "react-native-ui-lib";
import {SetStateAction, useState} from "react";
import {RootStackScreenProps} from "../types";
import {auth} from "../configs/firebase/FirebaseConfig";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions} from "react-native";
export default function RatingScreen({route, navigation}: RootStackScreenProps<'RatingScreen'>) {


    const {height, width} = Dimensions.get('window');

    return (
        <text>hello</text>
    );
}

