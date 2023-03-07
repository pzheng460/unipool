import {
    BorderRadiuses,
    Button,
    Card,
    Colors, GridList,
    Incubator,
    Spacings,
    TabController,
    Text,
    View
} from "react-native-ui-lib";
import {StyleSheet, TextStyle} from "react-native";
import {RootTabScreenProps} from "../types";
import TripCard from "../components/TripCard";
import {Trip} from "../Interface/TripInterface";
import {trips} from "../assets/data/dummyData";

function renderItem(item: Trip) {
    return (
        <TripCard trip={item}></TripCard>
    );
}
export function renderExplorePage() {
  return (
    <GridList data={trips}
              renderItem={({item}) => renderItem(item)}
              numColumns={1}
              itemSpacing={Spacings.s2}
              listPadding={Spacings.s2}
              style={{paddingTop: Spacings.s2}}
    />
  )
}

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {

  const tabTextStyle: TextStyle = {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#6c7072",
    opacity: 0.8,
  };

  return (
     <View useSafeArea
           flexG
           style={{
             backgroundColor: Colors.$backgroundDefault,
             height: "100%",
             width: "100%"
          }}
     >
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
         <View flex backgroundColor={Colors.background2}>
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
const styles = StyleSheet.create({
    list: {
        paddingTop: Spacings.s5,
    },
    itemImage: {
        width: '100%',
        height: 85,
        borderRadius: BorderRadiuses.br10
    }
});
