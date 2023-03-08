import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import { StyleSheet, Image } from "react-native";
import {RootStackParamList, RootStackScreenProps, RootTabScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {trips} from "../assets/data/dummyData";
import PeopleList from "../components/PeopleList";
import renderItem from "../components/PeopleList";
import {Trip} from "../Interface/TripInterface";
import {User} from "../Interface/TripInterface"
import TripCard from "../components/TripCard";
import React from "react";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    const tripId = route.params?.id;
    return (
        <View useSafeArea>
            <PeopleList people={trips[tripId as number].riders as User[]}></PeopleList>
            <View centerH paddingT-20>
                <Button
                    label={'Join'}
                    size={Button.sizes.medium}
                    backgroundColor={Colors.red30}
                    labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
                    style={{
                        width: 100,
                        height: 50,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
})