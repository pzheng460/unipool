import {RootTabScreenProps} from "../types";
import {Colors, View, Text} from "react-native-ui-lib";

export default function MessageScreen({navigation}: RootTabScreenProps<'Messages'>) {
  return(
    <View useSafeArea flex backgroundColor={Colors.background}>
      <View>
        <Text text40 marginT-12> Messages </Text>
      </View>

    </View>
  )
}