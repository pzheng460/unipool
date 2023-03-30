import {RootTabScreenProps} from "../types";
import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import {
    Text,
    ListItem,
    Avatar,
    Icon
} from '@rneui/themed';
import {DummyDataContext, DummyDataDispatch} from "../AppContextWrapper";
import {DataActions, GlobalData} from "../reducer/ActionType";
import {Trip} from "../Interface/TripInterface";

type MenuList = {
    title: string;
    icon: string;
};
const list1: MenuList[] = [
    {
        title: 'Appointments',
        icon: 'av-timer',
    },
    {
        title: 'Trips',
        icon: 'directions-car',
    },
    {
        title: 'Passwords',
        icon: 'fingerprint',
    },
    {
        title: 'Pitches',
        icon: 'lightbulb-outline',
    },
    {
        title: 'Updates',
        icon: 'track-changes',
    },
];

const log = () => console.log('this is an example method');

export default function MeScreen({navigation}: RootTabScreenProps<'Me'>) {
    const data = useContext(DummyDataContext) as GlobalData;
    const dispatch = useContext(DummyDataDispatch) as React.Dispatch<DataActions.Any>;

    const [refreshing, setRefreshing] = useState(false);
    const initTripData: Trip[] = [];
    const [tripData, setTripData] = useState(initTripData);

    useEffect(() => {
        setTripData(data.trips.filter(trip => {
            return trip.type === "upcoming";
        }));
    }, [data.trips]);
    const RenderRow = ({ item }: { item: MenuList }) => {
        return (
            <ListItem.Swipeable
                onPress={log}
                bottomDivider
            >
                <Icon name={item.icon} />
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
        );
    };
  return(
      <>
          <View
              style={{
                  flex: 1,
                  flexDirection: 'column',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginHorizontal: 10,
                  height: 250,
                  marginBottom: 0,
              }}
          >
              <View style={{ flex: 3, flexDirection: 'row' }}>
                  <View
                      style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                      }}
                  >
                      <Avatar
                          size={120}
                          source={{
                              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
                          }}
                          avatarStyle={{ borderRadius: 120 / 2 }}
                          overlayContainerStyle={{ backgroundColor: 'transparent' }}
                      />
                  </View>
                  <View
                      style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                      }}
                  >
                      <View
                          style={{
                              flex: 1,
                              marginTop: 10,
                              justifyContent: 'center',
                          }}
                      >
                          <Text
                              style={styles.name}
                          >
                              {data.user.firstName+" "+data.user.lastName}
                          </Text>
                          <Text
                              style={styles.email}
                          >
                              {data.user.email}
                          </Text>
                          <Image
                              source={require('../assets/images/rating.png')}
                              style={styles.ratingImage}
                          />
                      </View>
                  </View>
              </View>
          </View>
      <FlatList
          data={list1}
          keyExtractor={(a: MenuList, index: number) => index.toString()}
          renderItem={RenderRow}
      />
      </>
  )
}

const styles = StyleSheet.create({
    name: {
        fontFamily: 'bold',
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    email: {
        color: 'grey',
        fontSize: 12,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    list: {
        borderTopWidth: 1,
        borderColor: '#cbd2d9',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    ratingImage: {
        height: 19.21,
        width: 100,
        marginTop: 10,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
    },
});
