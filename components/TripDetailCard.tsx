import {Card, Chip, Text, View} from "react-native-ui-lib";
import {Trip} from "../Interface/TripInterface";
import dayjs from "dayjs";
import {StyleSheet} from "react-native";
import React from "react";

let localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);


export default function TripDetailsCard(props: {trip: Trip}) {
  const trip = props.trip;
  return (
    <Card height={200} borderRadius={5}
      style={{padding: 8, marginHorizontal: 8, marginTop: 0}}
    >
      {/*<Text> {JSON.stringify(props.trip)} </Text>*/}
      <View
        flex-2 row
      >
        <View
          flex-3
        >
          <View flex row
            centerV
          >
            {/*<View style={styles.circle}></View>*/}
            {LocationText(trip.from, "From: ")}
          </View>
          <View flex row
            centerV
          >
            {/*<View style={styles.circle}></View>*/}
            {LocationText(trip.to, "To: ")}
          </View>
        </View>
      </View>
      <View flex
            // style={{backgroundColor: 'blue', opacity: 0.1}}
      >
        {TimeText(trip.date)}
        {TimeText(trip.returnDate)}
      </View>
      <View flex row bottom
            // style={{backgroundColor: 'green', opacity: 0.1}}
        // style={{height: 24}}
      >
        <View flex-1 row >
          {
            trip.roundTrip ?
              <Chip
                backgroundColor={'#e3e5e5'}
                label={'Round Trip'}
                containerStyle={{borderWidth: 0}}
              ></Chip> : null
          }
        </View>
        <View flex-2 row right>
          {
            trip.sameGender ?
              <Chip
                backgroundColor={'#e3e5e5'}
                label={"Same Gender"}
                containerStyle={{borderWidth: 0, marginRight: 8}}
              ></Chip> : null
          }
          {
            <Chip
              backgroundColor={'#e3e5e5'}
              label={trip.seatsTaken + ' / ' + trip.seatsMax}
              containerStyle={{borderWidth: 0}}
            ></Chip>
          }
        </View>
      </View>
    </Card>
  );

  function LocationText(text?: string, prefix?: string) {
    return (
      <Text
        style={{fontSize: 18, fontWeight: 600}}
      >
        {prefix + text}
      </Text>
    );
  }

  function TimeText(date?: number) {
    return (
      <Text style={{fontSize: 15, color: "#8c8c8c"}}>
        {dayjs(1000 * (date || 0)).format('llll')}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 8,
    height: 8,
    border: 6,
    backgroundColor: '#000',
    borderRadius: 50,
    marginTop: 8,
  },
  dash: {
    height: 24,
    width: 4,
    backgroundColor: '#000',
  }
});