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

const data = [1, 2, 3, 4];
// @ts-ignore
function renderItem({ item }) {
    return (
        <Card
            height={120}
            flex1
            marginL-10
            marginR-10
        >
            <Card.Section
                content={[{text: 'Card content here', text70: true, red30: true}]}
                contentStyle={{alignItems: 'center'}}
            />
            <Card.Section
                content={[{text: item.toString(), text90BL: true, red30: true}]}
                contentStyle={{alignItems: 'center'}}
            />
        </Card>
    );
}
export function renderExplorePage() {
    return (
        <GridList data={data}
                  renderItem={renderItem}
                  numColumns={1}
                  contentContainerStyle={styles.list}
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
         <View flex>
           <TabController.TabPage index={0}>
               {renderExplorePage()}
             {/*<View flex style={{height: "100%"}}>*/}
             {/*    <Text>0</Text>*/}
             {/*</View>*/}
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
