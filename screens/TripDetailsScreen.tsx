import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import {RootStackParamList, RootStackScreenProps, RootTabScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {trips} from "../assets/data/dummyData";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    const tripId = route.params?.id;
    return (
        <View useSafeArea>
            <Text> Home Screen </Text>
            <Text> {JSON.stringify(trips[tripId as number])} </Text>
        </View>
    );
}