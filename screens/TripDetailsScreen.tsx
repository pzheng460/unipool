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
import React from "react";
import TripDetailsCard from "../components/TripDetailCard";
import RouteMap from "../components/RouteMap";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    const tripId = route.params?.id;
    const trip = trips[tripId as number];
    const windowWidth = Dimensions.get('window').width;
    const locations = [[33.7722, -84.3902], [48.8223785, 2.3361663]];

    return (
        <View useSafeArea flexG backgroundColor={Colors.white}>
            <View style={{flex: 1}}>
                <RouteMap coordinates = {locations}></RouteMap>
            </View>
          <View style={{flex: 2}} flex>
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
    );
}