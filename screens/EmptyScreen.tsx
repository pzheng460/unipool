import {Text, View} from "react-native-ui-lib";

export default function EmptyScreen() {
  return (
    <View flex center>
      <Text text50>
        Oops...
      </Text>
      <Text>
        Something went wrong...
      </Text>
    </View>
  )
}