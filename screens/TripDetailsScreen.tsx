import {Button, Colors, Incubator, Text, View} from "react-native-ui-lib";
import { Dimensions } from "react-native";
import {RootStackParamList, RootStackScreenProps, RootTabScreenProps} from "../types";
import PeopleList from "../components/PeopleList";
import {User} from "../Interface/TripInterface"
import React, {useContext} from "react";
import TripDetailsCard from "../components/TripDetailCard";
import RouteMap from "../components/RouteMap";
import {DummyDataContext} from "../AppContextWrapper";
import {GlobalData} from "../reducer/ActionType";
import EmptyScreen from "./EmptyScreen";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    const tripId = route.params?.id;
    // console.log(tripId)
    const data = useContext(DummyDataContext) as GlobalData;
    const trip = data.trips.find((item) => item.id === tripId)
    const windowWidth = Dimensions.get('window').width;
    const locations = [[33.7722, -84.3902], [48.8223785, 2.3361663]];

    return (
        trip !== undefined ?
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
          :
        <EmptyScreen/>
    );
}