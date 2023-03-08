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
            <Text h1 marginB-s5>
                Co-passengers
            </Text>
        }
        data={props.people}
        renderItem={({item}) => renderItem(item)}
        numColumns={1}
        itemSpacing={Spacings.s2}
        listPadding={Spacings.s2}
        contentContainerStyle={styles.list}
    >
    </GridList>
  );
}

function renderItem(item: User) {
  return (
      <Card style={{flex:1,
      flexDirection: 'row',
      height:60}}>
          <View flex-1 paddingL-15 paddingT-15>
              {
                  <Avatar size={30}
                          name={item.firstName}
                          backgroundColor={Colors.$backgroundWarningLight}
                          labelColor={Colors.$textMajor}
                          containerStyle={{marginLeft: 0}}
                  ></Avatar>
              }
          </View>
          <View flex-2 paddingT-10>
              <View flex-1>
                  <Text $textDefault>{item.firstName+" "+item.lastName}</Text>
              </View>
              <View flex-1>
                  <Text $textDefault>{"Rate: 4.5"}</Text>
              </View>
          </View>
          <View flex-3 paddingT-10>
              <Text $textDefault>{"Group Creator"}</Text>
          </View>
          <View flex-1></View>
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