import {RootTabScreenProps} from "../navigation/types";
import React, {useContext, useState} from 'react';
import {DummyDataContext} from "../AppContextWrapper";
import {GlobalData} from "../reducer/ActionType";
import {User} from "../Interface/TripInterface";
import {Avatar, Button, Colors, GridList, Text, View} from "react-native-ui-lib";
import {AntDesign} from "@expo/vector-icons";
import {Dimensions, ScrollView, TouchableOpacity} from "react-native";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useHeaderHeight} from "@react-navigation/elements";
import {useSignOut} from 'react-firebase-hooks/auth';
import {auth} from "../configs/firebase/FirebaseConfig";

type MenuItem = {
  title: string;
  icon: string | undefined;
  size: number;
};
const menuList: MenuItem[] = [
  {
    title: 'Address',
    icon: 'enviromento',
    size: 22,
  },
  {
    title: 'Trips',
    icon: 'clockcircleo',
    size: 20,
  },
  {
    title: 'Help',
    icon: 'questioncircleo',
    size: 20,
  },
  {
    title: 'Settings',
    icon: 'setting',
    size: 22,
  },
  {
    title: '===',
    icon: '===',
    size: 22,
  },
  {
    title: 'About Us',
    icon: undefined,
    size: 22,
  },
  {
    title: 'Privacy & Terms of Service',
    icon: undefined,
    size: 22,
  },
  // {
  //   title: 'Share UniPool to Friends',
  //   icon: undefined,
  //   size: 22,
  // },
];

const log = () => console.log('this is an example method');

export default function MeScreen({navigation}: RootTabScreenProps<'Me'>) {
  const data = useContext(DummyDataContext) as GlobalData;
  const user: User = data.user;
  const screenHeight = Dimensions.get("window").height;
  const headerHeight = useHeaderHeight();
  const bottomHeight = useBottomTabBarHeight();
  const [bounce, setBounce] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  
  function renderEntry(title: string, icon: string | undefined, size: number) {
    if (title === "===") {
      return (
        <View
          marginT-16
          marginB-16
          marginL-24
          marginR-24
          style={{
            height: 1,
            backgroundColor: "#d9d9d9"
          }}
        ></View>
      )
    } else {
      return (
        <TouchableOpacity
        >
          <View flex row style={{height: 56}} centerV marginL-32 marginR-32>
            { icon &&
              <View centerV
                    marginR-16
                    style={{width: 24}}
              >
                {/*@ts-ignore*/}
                <AntDesign name={icon} size={size}/>
              </View>
            }
            <View centerV left>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 20,
                  fontWeight: 500,
                }}
              >
                {title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  return(
    <View useSafeArea flex backgroundColor={Colors.white}>
      <ScrollView bounces={bounce}
                  onContentSizeChange={(w, h) => {
                    setBounce(screenHeight - h - headerHeight - bottomHeight < 0)
                  }}>
        <View
          row
          marginT-44
          style={{
            height: 64,
          }}
        >
          <View centerV
                paddingL-32
                paddingR-16
          >
            <Avatar size={64}
                    name={user.firstName}
                    backgroundColor={Colors.$backgroundWarningLight}
                    labelColor={Colors.$textMajor}
            ></Avatar>
          </View>
          <View flex centerV marginT-4 marginB-4 marginR-32>
            <View flex row>
              <View left>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 32,
                    fontWeight: "bold",
                  }}
                > {user.firstName + " " + user.lastName} </Text>
              </View>
              <View flex row right>
                <View centerV>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 32,
                      fontWeight: 500,
                    }}
                  > {user.rating} </Text>
                </View>
                <View centerV>
                  <AntDesign name={'star'} size={16} color={"gold"}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: "#8c8c8c"
                }}
              > {"george.burdell@gatech.edu"} </Text>
            </View>
          </View>
        </View>
        <View margin-32 marginT-22>
          <Button label={'View Profile'} backgroundColor={Colors.primary} fullWidth
                  style={{
                    borderRadius: 8
                  }}
          />
        </View>
        <View marginT-16
          // style={{
          // height: 56 * menuList.length
          //}}
        >
          <GridList data={menuList}
                    renderItem={({item}) => renderEntry(item.title, item.icon, item.size)}
                    numColumns={1}
                    scrollEnabled={false}
                    itemSpacing={0}
          >
          </GridList>
        </View>
        <View margin-32 marginT-22>
          <Button label={'Log Out'} backgroundColor={Colors.background2} fullWidth
                  color={Colors.error}
                  labelStyle={{fontWeight: 500, fontVariant: 'underline'}}
                  style={{
                    borderRadius: 8
                  }}
                  onPress={async () => {
                    const success = await signOut();
                  }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

