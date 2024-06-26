import {
  Chip,
  Colors,
  FloatingButton,
  GridList,
  Spacings,
  TabController,
  Text,
  TextField,
  View
} from "react-native-ui-lib";
import {Dimensions, Keyboard, ScrollView, TextStyle} from "react-native";
import {RootTabScreenProps} from "../navigation/types";
import TripCard from "../components/TripCard";
import {Trip} from "../Interface/TripInterface";
import {trip3, user1, user2} from "../assets/data/dummyData";
import React, {useContext, useEffect, useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import {DummyDataContext, DummyDataDispatch} from "../AppContextWrapper";
import {ActionTypes, DataActions, GlobalData} from "../reducer/ActionType";
import {Divider} from "@rneui/themed";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {auth, db} from "../configs/firebase/FirebaseConfig";
import {Modal, Portal, useTheme} from "react-native-paper";
import {Button} from "../components";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {useLoading} from "../contexts/LoadingContext";
import RegisterCompleteScreen from "./RegisterCompleteScreen";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {

  const data = useContext(DummyDataContext) as GlobalData;
  const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;

  const [refreshing, setRefreshing] = useState(false);
  const initTripData: Trip[] = [];
  const [tripData, setTripData] = useState(initTripData);
  const [tabIndex, setTabIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(true);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const [user,] = useAuthState(auth);
  const [loading, setLoading] = useLoading();
  const theme = useTheme();
  const [signOut,] = useSignOut(auth);

  const verifyModal = () => (
    <Portal>
      <Modal visible={!user?.emailVerified as boolean} dismissable={false}
             contentContainerStyle={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: theme.colors.background,
               borderRadius: 8,
               margin: 16
             }}
      >
        <RegisterCompleteScreen/>
        <Button mode={"text"} onPress={async () => {
          const success = await signOut();
          if (success) {
            navigation.replace("Login");
          }
        }} style={{marginTop: -16, marginBottom: 8}}>
          Go Back To Login
        </Button>
      </Modal>
    </Portal>
  );

  const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
          if (
              lastContentOffset.value > event.contentOffset.y &&
              isScrolling.value
          ) {
              translateY.value = 0;
              // console.log("scrolling up");
              runOnJS(setShowSearch)(true);
              runOnJS(Keyboard.dismiss)();
          } else if (
              lastContentOffset.value < event.contentOffset.y &&
              isScrolling.value
          ) {
              translateY.value = 100;
              // console.log("scrolling down");
              runOnJS(setShowSearch)(false);
              runOnJS(Keyboard.dismiss)();
          }
          lastContentOffset.value = event.contentOffset.y;
      },
      onBeginDrag: (e) => {
          isScrolling.value = true;
      },
      onEndDrag: (e) => {
          isScrolling.value = false;
      },
  });
  function plusIcon() {
      return <AntDesign name="plus" size={24} color="white" style={{padding: 16}} />;
  }

  async function loadTrips() {
    const querySnapshot = await getDocs(collection(db, "trips"));
    const trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      const trip: Trip = {
        id: doc.id,
        from: doc.data().from,
        to: doc.data().to,
        roundTrip: doc.data().roundTrip,
        date: doc.data().date,
        returnDate: doc.data().returnDate,
        type: doc.data().type,
        seatsTaken: doc.data().seatsTaken,
        seatsMax: doc.data().seatsMax,
        riders: doc.data().riders,
        sameGender: doc.data().sameGender,
      }
      // console.log("trip => " + JSON.stringify(trip));
      trips.push(trip);
    });

    dispatch({
      type: ActionTypes.FETCH_TRIP,
      trips: trips
    });
  }

  async function loadUpcomingTrips() {
    const upcomingTrips: Trip[] = [];

    const upcomingTripIds = data.user.upcomingTrips;
    if (upcomingTripIds.length > 0 && typeof upcomingTripIds[0] === "string") {
      for (const pastTripID of upcomingTripIds) {
        const docSnap = await getDoc(doc(db, "trips", pastTripID));
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let trip: Trip = {
            id: pastTripID,
            from: docSnap.data().from,
            to: docSnap.data().to,
            roundTrip: docSnap.data().roundTrip,
            date: docSnap.data().date,
            returnDate: docSnap.data().returnDate,
            type: docSnap.data().type,
            seatsTaken: docSnap.data().seatsTaken,
            seatsMax: docSnap.data().seatsMax,
            riders: docSnap.data().riders,
            sameGender: docSnap.data().sameGender,
          };
          upcomingTrips.push(trip);
        } else {
          console.log("No such document!");
        }
      }
      dispatch({
        type: ActionTypes.UPDATE_UPCOMING_TRIPS,
        trips: upcomingTrips,
      });
    }
  }

  async function loadPastTrips() {
      const pastTrips: Trip[] = [];
      const pastTripIDs = data.user.pastTrips;
      // console.log("++++++++++++++++++++++++++++++")
      // console.log(pastTripIDs)

      if (pastTripIDs.length > 0 && typeof pastTripIDs[0] === "string") {
        for (const pastTripID of pastTripIDs) {
          const docSnap = await getDoc(doc(db, "trips", pastTripID));
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            let trip: Trip = {
              id: pastTripID,
              from: docSnap.data().from,
              to: docSnap.data().to,
              roundTrip: docSnap.data().roundTrip,
              date: docSnap.data().date,
              returnDate: docSnap.data().returnDate,
              type: docSnap.data().type,
              seatsTaken: docSnap.data().seatsTaken,
              seatsMax: docSnap.data().seatsMax,
              riders: docSnap.data().riders,
              sameGender: docSnap.data().sameGender,
            };
            pastTrips.push(trip);
          } else {
            console.log("No such document!");
          }
        }
        dispatch({
          type: ActionTypes.UPDATE_PAST_TRIPS,
          trips: pastTrips,
        });
      }
    }

  async function loadData() {
    return Promise.all([
      await loadTrips(),
      await loadUpcomingTrips(),
      await loadPastTrips(),
    ]);
  }

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    // console.log("++++++++++++++++++++++++++++" + data.trips[0].riders[0]);
    const validTrips = data.trips?.filter((trip) => {
      return trip.type === "upcoming"
        && trip.seatsTaken < trip.seatsMax
        && !trip.riders.includes(data.user.id);
    });

    (async () => {
      const shouldFilter = await Promise.all(validTrips?.map(async (trip) => {
        const docSnap = await getDoc(doc(db, "users", trip.riders[0]));
        let sameGender = trip.sameGender === false;
        if (docSnap.exists()) {
          const ownerGender = docSnap.data().gender;
          // console.log(ownerGender);
          sameGender = sameGender || (trip.sameGender === true && ownerGender === data.user.gender);
        }
        return sameGender;
      }));
      const sameGenderTrips = validTrips?.filter((trip, i) => (shouldFilter[i]));
      setTripData(sameGenderTrips);
      setLoading(false);
    })();

  }, [data.trips]);

  const options = [{
    id: 0,
    name: "All",
    active: true
  },
    {
      id: 1,
      name: "Today",
      active: false
    },
    {
      id: 2,
      name: "Grocery",
      active: false
    },
    {
      id: 3,
      name: "Airport",
      active: false
    },
    {
      id: 4,
      name: "Shopping",
      active: false
    }
  ];
  const [active, setActive] = useState(options);
  const {height, width} = Dimensions.get('window');

  const refreshTrips = () => {
    setRefreshing(true);
    fetch('https://randomuser.me/api/?results=8')
      .then((response) => response.json())
      .then((responseJson) => {
        setRefreshing(false);
        dispatch({
          type: ActionTypes.ADD_UPCOMING_TRIP,
          trip: {
            ...trip3,
            type: 'upcoming',
            riders: [user1, user2],
            id: Date.now().toString(),
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function renderItem(item: Trip) {
    return (
      // @ts-ignore
          <TripCard trip={item} onPress={() => navigation.navigate('TripDetails', {id: item.id})}/>
    );
  }
  function renderCardList() {
    return (
      <Animated.FlatList data={tripData}
                renderItem={({item}) => renderItem(item)}
                numColumns={1}
                onScroll={scrollHandler}
                // itemSpacing={Spacings.s2}
                ItemSeparatorComponent={() => <View style={{height: Spacings.s2}} />}
                style={{paddingTop: Spacings.s2,
                  backgroundColor: Colors.background2,
                }}
                keyExtractor={(item, index) => item.id.toString()}
                // refreshControl={<RefreshControl refreshing={refreshing} title="refreshing" onRefresh={refreshTrips} />}
      />
    )
  }

  function renderUpcomingTrips() {
    if (data.user?.upcomingTrips.length === 0) {
      return (
          <Text text65 margin-20>
            No upcoming trips
          </Text>
      )
    }


    return (
      <View flex-G>
        <GridList data={data.user?.upcomingTrips}
                  renderItem={({item}) => renderItem(item)}
                  numColumns={1}
                  itemSpacing={Spacings.s2}
                  scrollEnabled={false}
                  style={{
                    backgroundColor: Colors.background2,
                    // overflow: 'visible',
                    // marginTop: Spacings.s2,
                    paddingTop: Spacings.s2,
                  }}
                  keyExtractor={(item, index) => item.id}
          // refreshControl={<RefreshControl refreshing={refreshing} title="refreshing" onRefresh={refreshTrips} />}
        />
      </View>
    )
  }
  function renderPastTrips() {
    if (data.user?.pastTrips.length === 0) {
      return (
          <Text text65 margin-20>
            No past trips
          </Text>
      )
    }

    return (
        <GridList data={data.user?.pastTrips}
                  renderItem={({item}) => renderItem(item)}
                  numColumns={1}
                  itemSpacing={Spacings.s2}
                  scrollEnabled={false}
                  style={{
                    backgroundColor: Colors.background2,
                    // overflow: 'visible',
                    paddingTop: Spacings.s2,
                  }}
                  keyExtractor={(item, index) => item.id}
            // refreshControl={<RefreshControl refreshing={refreshing} title="refreshing" onRefresh={refreshTrips} />}
        />
    )
  }

  const handleClick = function (idx: number) {
    // @ts-ignore
    let new_opt = active.map((option) => {
      if (option.id === idx) {
        return {
          ...option,
          active: !option.active
        };
      } else {
        return option;
      }
    });
    // console.log(new_opt);
    setActive(new_opt);
  };

  const tabTextStyle: TextStyle = {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#6c7072",
    opacity: 0.8,
  };

  // @ts-ignore
  function renderChipFilter() {
    return active.map((item, i) => (
      <Chip
        key={i}
        marginR-8
        label={item.name}
        labelStyle={{color: item.active ? Colors.white : Colors.primary, padding: 8}}
        iconProps={{tintColor: Colors.white}}
        backgroundColor={item.active ? Colors.dark : Colors.background2}
        containerStyle={{
          borderWidth: 0,
          height: 32
        }}
        onPress={() => handleClick(i)}
      />
    ))
  }

  const animatedStyle = useAnimatedStyle(() => ({
      height: showSearch
        ? withTiming(50, {duration: 200})
        : withTiming(0, {duration: 200})
  }))

  function renderExplorePage() {
    return (
      <View flex>
        <View>
        <Animated.View style={animatedStyle}>
        <TextField
            marginT-8
            marginL-12
            marginR-12
            placeholder={'Search for a place / group'}
            leadingAccessory={<AntDesign name="search1" size={18} color={'#8c8c8c'} style={{marginRight: 8}}/>}
            fieldStyle={{
              backgroundColor: showSearch ? Colors.background2 : Colors.white,
              padding: 10,
              borderRadius: 8,
              borderWidth: 0,
            }}
            style={{fontSize: 16}}
            />
        </Animated.View>

        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{paddingBottom: 8, paddingTop: 8, marginLeft: 12, paddingRight: 12}}
        >
            {renderChipFilter()}
        </ScrollView>
        </View>
        {/*{refreshing ? <ActivityIndicator size="small" /> : null}*/}
        {renderCardList()}
      </View>
    )
  }

    function renderFloatingButton() {
        return (
            <View style={{
                // alignItems: 'flex-end',
                // justifyContent: 'flex-end'
                marginLeft: width-80
            }}>
                <FloatingButton
                    visible={true}
                    hideBackgroundOverlay={true}
                    bottomMargin={16}
                    button={{
                        iconSource: plusIcon,
                        onPress: () => { // @ts-ignore
                            navigation.navigate('TripCreate1')},
                        // size: 64,
                        backgroundColor: Colors.black,
                    }}
                />
            </View>
        )
    }

  function renderMyTripPage() {
    return (
      <View flex>
        <View centerV height={32} margin-8>
          <Text text50>
            Upcoming Trips
          </Text>
        </View>
        {renderUpcomingTrips()}
        <Divider width={1} inset={false} insetType="middle" color={Colors.primary}/>
        <View centerV height={32} margin-8>
          <Text text50>
            Past Trips
          </Text>
        </View>
        {renderPastTrips()}
      </View>
    )
  }
  const insets = useSafeAreaInsets();
  return (
    <View flexG style={{backgroundColor: Colors.$backgroundDefault,
      // paddingBottom: insets.bottom,
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }}>
      {verifyModal()}
      <TabController items={[{label: 'Explore'}, {label: 'My Trips'}]} initialIndex={tabIndex}>

        <TabController.TabBar
          enableShadows
          indicatorInsets={50}
          indicatorStyle={{
            backgroundColor: Colors.primary,
            height: 4,
            borderRadius: 8,
            bottom: 0,
          }}
          labelStyle={tabTextStyle}
          selectedLabelStyle={{
            ...tabTextStyle,
            fontSize: 18
          }}
          selectedLabelColor="#000"
        />
        <View flex >

          <TabController.TabPage index={0}>
            {renderExplorePage()}
            {renderFloatingButton()}
          </TabController.TabPage>

          <TabController.TabPage index={1} lazy>
            <ScrollView>
                {/*<SwipeGesture onSwipePerformed={(action: string) => {*/}
                {/*    if (action === 'left') {*/}
                {/*        console.log('left');*/}
                {/*    } else if (action === 'right') {*/}
                {/*        console.log('right');*/}
                {/*}}}>*/}
                {renderMyTripPage()}
                {/*</SwipeGesture>*/}
            </ScrollView>
          </TabController.TabPage>

        </View>
      </TabController>
    </View>
  );
}
