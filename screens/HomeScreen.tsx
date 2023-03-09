import {Chip, Colors, GridList, Spacings, TabController, Text, TextField, View} from "react-native-ui-lib";
import {RefreshControl, ScrollView, TextStyle} from "react-native";
import {RootTabScreenProps} from "../types";
import TripCard from "../components/TripCard";
import {Trip} from "../Interface/TripInterface";
import {trip1, trips} from "../assets/data/dummyData";
import React, {useState} from "react";

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
      <TripCard trip={item} onPress={() => navigation.navigate('TripDetails', {id: item.id})}></TripCard>
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

  function renderExplorePage() {
    return (
      <View flex>
        <View>
          <TextField
            marginT-8
            marginL-24
            marginR-24
            placeholder={'A place / group'}
            fieldStyle={{
              backgroundColor: Colors.background2,
              padding: 12,
              borderRadius: 50,
              borderWidth: 0,
            }}
            style={{fontSize: 16}}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{paddingBottom: 8, paddingTop: 8, marginLeft: 24}}
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