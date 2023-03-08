import {Colors, GridList, Spacings, Text, TextField, View} from "react-native-ui-lib";
import {User} from "../Interface/TripInterface"

export default function PeopleList(props: {people: User[]}) {
  return (
    <GridList
      data={props.people}
      renderItem={({item}) => renderItem(item)}
      numColumns={1}
      itemSpacing={Spacings.s2}
      listPadding={Spacings.s2}
    >
    </GridList>
  );
}

function renderItem(item: User) {
  return (
    <View>

    </View>
  );
}