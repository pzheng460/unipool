import {Button, Colors, Incubator, TabController, Text, View} from "react-native-ui-lib";
import {StyleSheet, TextStyle} from "react-native";
import {RootTabScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {

  const tabTextStyle: TextStyle = {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#6c7072",
    opacity: 0.8,
  };

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
           selectedLabelStyle={tabTextStyle}
           selectedLabelColor="#000"
         />
         <View>
           <TabController.TabPage index={0}>
             <View flex style={{height: "100%"}}>
               <Text>0</Text>
             </View>
           </TabController.TabPage>
           <TabController.TabPage index={1} lazy>
             <Text>1</Text>
           </TabController.TabPage>
         </View>
       </TabController>
     </View>
  );
}