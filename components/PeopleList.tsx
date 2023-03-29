import {
    Avatar,
    BorderRadiuses,
    Button,
    Card,
    Colors,
    GridList,
    Spacings,
    Text,
    TextField,
    View
} from "react-native-ui-lib";
import {StyleSheet} from 'react-native';
import {User} from "../Interface/TripInterface"
import React from "react";

export default function PeopleList(props: {people: User[]}) {
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
      <Card style={{flex:1,
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