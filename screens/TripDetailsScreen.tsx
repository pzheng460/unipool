import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import {RootStackParamList, RootStackScreenProps, RootTabScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    return (
        <SafeAreaView>
            <Text> Home Screen </Text>
        </SafeAreaView>
    );
}