import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import { StyleSheet, Image, Dimensions } from "react-native";
import {RootStackParamList, RootStackScreenProps, RootTabScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {trips} from "../assets/data/dummyData";
import PeopleList from "../components/PeopleList";
import renderItem from "../components/PeopleList";
import {Trip} from "../Interface/TripInterface";
import {User} from "../Interface/TripInterface"
import TripCard from "../components/TripCard";
import React, {useContext} from "react";
import TripDetailsCard from "../components/TripDetailCard";
import {DummyDataContext} from "../AppContextWrapper";
import {GlobalData} from "../reducer/ActionType";
import EmptyScreen from "./EmptyScreen";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {

    const tripId = route.params?.id;
    console.log(tripId)
    const data = useContext(DummyDataContext) as GlobalData;
    const trip = data.trips.find((item) => item.id === tripId)
    const windowWidth = Dimensions.get('window').width;

    return (
        trip !== undefined ?
        <View useSafeArea flexG backgroundColor={Colors.white}>
            <Image
                style={{width: windowWidth, height: 200}}
                source={require('../assets/images/random-map.png')}
            />
          <View flex>
            <TripDetailsCard trip={trip}></TripDetailsCard>

            <PeopleList people={trip.riders as User[]}></PeopleList>
            <View centerH paddingT-20>
              <Button
                label={'Join'}
                size={Button.sizes.medium}
                backgroundColor={Colors.primary}
                labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
                style={{
                  width: 100,
                  height: 50,
                }}
              />
            </View>
          </View>
        </View>
          :
        <EmptyScreen/>
    );
}