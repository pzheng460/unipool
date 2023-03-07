import {
    BorderRadiuses,
    Button,
    Card,
    Colors, GridList,
    Incubator,
    Spacings,
    TabController,
    Text,
    View,
    Chip,
    GridListItem,
    TabControllerItemProps,
    TabControllerImperativeMethods,
    TextField
} from "react-native-ui-lib";
import {RefreshControl, StyleSheet, TextStyle, ActivityIndicator} from "react-native";
import {ScrollView, Alert, TouchableOpacity} from "react-native";
import {RootTabScreenProps} from "../types";
import TripCard from "../components/TripCard";
import {Trip} from "../Interface/TripInterface";
import {trips, trip1} from "../assets/data/dummyData";
import React, {useEffect, useState} from "react";
import firebase from "firebase/compat";
import functions = firebase.functions;

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {

    const [refreshing, setRefreshing] = useState(false);
    const [tripData, setTripData] = useState(trips);

    const options = [{
        id: 0,
        name: "All",
        active: false
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
            name: "Market",
            active: false
        },
        {
            id: 4,
            name: "Shopping",
            active: false
        }
    ];
    const [active, setActive] = useState(options);

    // useEffect(() => {
    //     loadUserData();
    // }, []);

    const refreshTrips = () => {
        setRefreshing(true);
        fetch('https://randomuser.me/api/?results=8')
            .then((response) => response.json())
            .then((responseJson) => {
                setRefreshing(false);
                let newData = tripData.concat([trip1]);
                setTripData(newData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function renderItem(item: Trip) {
        return (
            <TripCard trip={item}></TripCard>
        );
    }
    function renderCardList() {
        return (
            <GridList data={tripData}
                      renderItem={({item}) => renderItem(item)}
                      numColumns={1}
                      itemSpacing={Spacings.s2}
                      listPadding={Spacings.s2}
                      style={{paddingTop: Spacings.s2,
                          backgroundColor: Colors.background2,
                          // minHeight: '100%'
                      }}
                      refreshControl={<RefreshControl refreshing={refreshing} title="refreshing" onRefresh={refreshTrips} />}

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
        console.log(new_opt);
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
                marginL-15
                label={item.name}
                labelStyle={{color: item.active ? Colors.white : Colors.primary}}
                iconProps={{tintColor: Colors.white}}
                backgroundColor={item.active ? Colors.dark : Colors.background2}
                containerStyle={{
                    borderWidth: 0,
                    width: 100,
                    height: 32
                }}
                onPress={() => handleClick(i)}
            />
        ))
    }

    function renderExplorePage() {
        return (
            <View flex>
                <View>
                    <TextField
                        marginT-10
                        marginL-25
                        marginR-25
                        placeholder={'A place / group'}
                        fieldStyle={{
                            backgroundColor: Colors.background2,
                            padding: 12,
                            borderRadius: 50,
                            borderWidth: 0,
                        }}
                        style={{fontSize: 16}}
                        enableErrors
                    />
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        {renderChipFilter()}
                    </ScrollView>
                </View>
                {/*{refreshing ? <ActivityIndicator size="small" /> : null}*/}
                {renderCardList()}
            </View>
        )
    }

    return (
        <View useSafeArea flexG style={{backgroundColor: Colors.$backgroundDefault}}>
            <TabController items={[{label: 'Explore'}, {label: 'My Trips'}]}>
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
                    </TabController.TabPage>
                    <TabController.TabPage index={1} lazy>
                        <Text>1</Text>
                    </TabController.TabPage>
                </View>
            </TabController>
        </View>
    );
}