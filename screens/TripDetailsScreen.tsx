import {Avatar, BorderRadiuses, Button, Card, Colors, GridList, Spacings, Text, View} from "react-native-ui-lib";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {RootStackScreenProps} from "../navigation/types";
// import PeopleList from "../components/PeopleList";
import {Trip, User} from "../Interface/TripInterface"
import React, {useContext, useEffect, useState} from "react";
import TripDetailsCard from "../components/TripDetailCard";
import RouteMap from "../components/RouteMap";
import {DummyDataContext} from "../AppContextWrapper";
import {ActionTypes, GlobalData} from "../reducer/ActionType";
import EmptyScreen from "./EmptyScreen";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../configs/firebase/FirebaseConfig";
import {useLoading} from "../contexts/LoadingContext";

export default function TripDetailsScreen({route, navigation}: RootStackScreenProps<'TripDetails'>) {
    const tripId = route.params?.id;
    const data = useContext(DummyDataContext) as GlobalData;
    const trip = data.trips.find((item) => item.id === tripId)
    const windowWidth = Dimensions.get('window').width;
    const locations = [[33.7722, -84.3902], [48.8223785, 2.3361663]];
    const [loading, setLoading] = useLoading();
    const [riders, setRiders] = useState<User[]>([]);
    const [tripCreator, setTripCreator] = useState('');
    const [showJoin, setShowJoin] = useState(true);

    useEffect(() => {
        setLoading(true);
        const users: User[] = [];
        trip?.riders.forEach(async (riderID, i) => {
            try {
                const docSnap = await getDoc(doc(db, "users", riderID));
                if (docSnap.exists()) {
                    if (i === 0) {
                        setTripCreator(docSnap.data().firstName);
                    }
                    if (docSnap.id === data.user.id) {
                        setShowJoin(false);
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
        console.log(users);
        setTimeout(() => setLoading(false), 500)

    }, []);

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
                        item.firstName === tripCreator && <Text $textDefault>{"Group Creator"}</Text>
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
                {showJoin && <Button
                label={'Join'}
                size={Button.sizes.medium}
                backgroundColor={Colors.primary}
                labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
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