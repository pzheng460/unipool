import {
    Avatar,
    BorderRadiuses,
    Button,
    Card,
    Colors,
    GridList,
    Incubator,
    Spacings,
    Text,
    View
} from "react-native-ui-lib";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {RootStackParamList, RootStackScreenProps, RootTabScreenProps} from "../types";
// import PeopleList from "../components/PeopleList";
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

    function PeopleList(props: {people: User[]}) {
        return (
            <GridList
                ListHeaderComponent={
                    <Text text50 marginB-s5>
                        Passengers
                    </Text>
                }
                data={props.people}
                renderItem={({item}) => renderItem(item)}
                numColumns={1}
                itemSpacing={Spacings.s1}
                listPadding={Spacings.s2}
                contentContainerStyle={styles.list}
                scrollEnabled={false}
            >
            </GridList>
        );
    }

    function renderItem(item: User) {
        return (
            <Card
                onPress={() => navigation.navigate('Rating', {userId: item.id})}
                style={{flex:1,
                    flexDirection: 'row',
                    height:64,
                    padding: 8,
                    borderRadius: 5,
                    // overflow: 'hidden',
                }}
            >
                <View flex-1 center>
                    <Avatar size={32}
                            name={item.firstName}
                            backgroundColor={Colors.$backgroundWarningLight}
                            labelColor={Colors.$textMajor}
                    ></Avatar>
                </View>
                <View flex-2>
                    <View flex centerV>
                        <Text $textDefault>{item.firstName+" "+item.lastName}</Text>
                    </View>
                    <View flex centerV>
                        <Text $textDefault>{"Rating: " + item.rating.toFixed(2)}</Text>
                    </View>
                </View>
                <View flex-2 center>
                    {
                        item.firstName === "Lucas" && <Text $textDefault>{"Group Creator"}</Text>
                    }
                </View>
                {/*<View flex-1></View>*/}
            </Card>
        );
    }

    return (
        trip !== undefined ?
        <View useSafeArea flexG backgroundColor={Colors.white}>
        <ScrollView>
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
        </ScrollView>
        </View>
          :
        <EmptyScreen/>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingTop: Spacings.s5
    },
    itemImage: {
        width: '100%',
        height: 85,
        borderRadius: BorderRadiuses.br10
    }
});