import {Avatar, BorderRadiuses, Button, Card, Colors, GridList, Spacings, Text, View} from "react-native-ui-lib";
import {Alert, Dimensions, ScrollView, StyleSheet} from "react-native";
import {RootStackScreenProps} from "../navigation/types";
// import PeopleList from "../components/PeopleList";
import {Trip, User} from "../Interface/TripInterface"
import React, {useContext, useEffect, useState} from "react";
import TripDetailsCard from "../components/TripDetailCard";
import RouteMap from "../components/RouteMap";
import {DummyDataContext, DummyDataDispatch} from "../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../reducer/ActionType";
import EmptyScreen from "./EmptyScreen";
import {deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../configs/firebase/FirebaseConfig";
import {useLoading} from "../contexts/LoadingContext";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    const tripId = route.params?.id as string;
    const data = useContext(DummyDataContext) as GlobalData;
    const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;
    const windowWidth = Dimensions.get('window').width;
    const locations = [[33.7722, -84.3902], [48.8223785, 2.3361663]];
    const [trip, setTrip] = useState<Trip>(data.trips.find((item) => item.id === tripId) as Trip);
    const [loading, setLoading] = useLoading();
    const [riders, setRiders] = useState<User[]>([]);
    const [tripCreator, setTripCreator] = useState('');
    const [joined, setJoined] = useState(false);
    const [isPast, setIsPast] = useState(false);

    useEffect(() => {
        console.log("---------------------------")
        console.log(data.trips.find((item) => item.id === tripId));
        setTrip(data.trips.find((item) => item.id === tripId) as Trip);
    }, [data.trips])

    useEffect(() => {
        setLoading(true);
        if (trip.type === 'past') {
            setIsPast(true);
        }
        const users: User[] = [];
        console.log("+++++++++++++++++++++++++")
        trip?.riders.forEach(async (riderID, i) => {
            try {
                const docSnap = await getDoc(doc(db, "users", riderID));
                if (docSnap.exists()) {
                    if (i === 0) {
                        setTripCreator(docSnap.data().firstName);
                    }
                    if (docSnap.id === data.user.id) {
                        setJoined(true);
                    }
                    let user: User = {
                        id: riderID,
                        firstName: docSnap.data().firstName,
                        lastName: docSnap.data().lastName,
                        email: docSnap.data().email,
                        gender: docSnap.data().gender,
                        pastTrips: docSnap.data().pastTrips,
                        upcomingTrips:docSnap.data().upcomingTrips,
                        rating: docSnap.data().rating,
                        numOfRatings: docSnap.data().numOfRatings,
                    };
                    users.push(user);
                    setRiders(users);
                } else {
                    alert("No such document!");
                }
            } catch (error) {
                alert(error);
            }
        });
        // console.log(users);
        setTimeout(() => setLoading(false), 500);

    }, [trip]);

    async function handlePress() {
        setLoading(true);
        if (joined) {
            setJoined(false);
            try {

                const upcomingTrips = data.user.upcomingTrips.filter((thisTrip) => (trip.id !== thisTrip.id));

                console.log(upcomingTrips)

                await updateDoc(doc(db, "users", data.user.id), {
                    upcomingTrips: [...upcomingTrips],
                });

                let tripRiders = trip?.riders as string[];

                console.log(tripRiders)
                const newRiders = tripRiders.filter((id) => id !== data.user.id);

                console.log(newRiders)

                if (newRiders.length <= 0) {
                    await deleteDoc(doc(db, "trips", tripId));

                    dispatch({
                        type: ActionTypes.LEAVE_TRIP_AND_DELETE,
                        trip: trip
                    })

                    navigation.goBack();
                } else {
                    await updateDoc(doc(db, "trips", tripId), {
                        riders: newRiders,
                        seatsTaken: newRiders.length,
                    });

                    dispatch({
                        type: ActionTypes.LEAVE_TRIP,
                        trip: {
                            ...trip,
                            riders: newRiders,
                            seatsTaken: newRiders.length,
                        }
                    });
                }

            } catch (e) {
                    console.log(e);
                    Alert.alert("Connection Error");
            } finally {
                setLoading(false);
                Alert.alert("Success");
            }
        } else {
            setJoined(true);
            try {

                const upcomingTrips: string[] = [];
                data.user.upcomingTrips.forEach(upcomingTrip => {
                    upcomingTrips.push(upcomingTrip.id);
                });

                console.log(upcomingTrips)

                await updateDoc(doc(db, "users", data.user.id), {
                    upcomingTrips: [...upcomingTrips, trip?.id],
                });

                let tripRiders = trip?.riders as string[];

                console.log(tripRiders)
                const newRiders = [...tripRiders, data.user.id];

                console.log(newRiders)

                // setRiders((riders) => ([...riders, {...data.user, upcomingTrips: [...upcomingTrips, trip?.id]}]));

                await updateDoc(doc(db, "trips", tripId), {
                    riders: newRiders,
                    seatsTaken: newRiders.length,
                });

                dispatch({
                    type: ActionTypes.JOIN_TRIP,
                    trip: {
                        ...trip,
                        riders: newRiders,
                        seatsTaken: newRiders.length,
                    }
                });

            } catch (e) {
                console.log(e);
                Alert.alert("Connection Error");
            } finally {
                setLoading(false);
                Alert.alert("Success");
            }
        }
    }


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
                        item.firstName === tripCreator && <Text $textDefault>{"Group Owner"}</Text>
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

            <PeopleList people={riders}></PeopleList>
            <View centerH paddingT-20>
                {!isPast && <Button
                label={joined ? 'Leave' : 'Join'}
                size={Button.sizes.medium}
                backgroundColor={joined ? Colors.red20 : Colors.primary}
                labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
                onPress={() => handlePress()}
                style={{
                  width: 100,
                  height: 50,
                }}
              />}
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