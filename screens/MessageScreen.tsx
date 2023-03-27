import {RootTabScreenProps} from "../types";
import {
  Colors,
  View,
  Text,
  TextField,
  GridList,
  Avatar,
  Spacings,
  Badge
} from "react-native-ui-lib";
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {Room, User, MessageType} from "@flyerhq/react-native-firebase-chat-core";


export default function MessageScreen({navigation}: RootTabScreenProps<'Messages'>) {

  const userList: User[] = [
    {
      id: "0",
      firstName: "David",
      lastName: "Kenn",
      role: 'user',
    },
    {
      id: "1",
      firstName: "Xiaoming",
      lastName: "Wang",
      role: 'user',
    },
    {
      id: "2",
      firstName: "John",
      lastName: "Afterhill",
      role: 'user',
    }
  ]

  const messageList: MessageType.Text[] = [
    {
      author: userList[0],
      id: "0",
      text: "Hello there!",
      type: "text"
    },
    {
      author: userList[1],
      id: "1",
      text: "Nice to meet you!",
      type: "text"
    },
    {
      author: userList[2],
      id: "2",
      text: "Wow wow",
      type: "text"
    }
  ]

  const rooms: Room[] = [
    {
      id: "0",
      name: "Trip to Airport",
      type: "group",
      users: userList,
      lastMessages: messageList,
    },
    {
      id: "1",
      name: "Trip to Hmart",
      type: "group",
      users: userList,
      lastMessages: messageList,
    },
    {
      id: "2",
      name: "Trip to Kroger",
      type: "group",
      users: userList,
      lastMessages: messageList,
    },
    {
      id: "3",
      name: "Trip to Ujimaya",
      type: "group",
      users: userList,
      lastMessages: messageList,
    }
  ]

  function renderMessageList(item: Room) {
    // @ts-ignore
    return (
        <View
          flex
          row
          style={{
            height: 72,
            // padding: 12,
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <View flex-S left centerV
                padding-12
          >
            {/*{*/}
            {/*  item.users.map((rider: User) => (*/}
            {/*    <Avatar size={48}*/}
            {/*            name={rider.firstName}*/}
            {/*            backgroundColor={Colors.$backgroundWarningLight}*/}
            {/*            labelColor={Colors.$textMajor}*/}
            {/*            containerStyle={{marginLeft: -18, opacity: 0.7}}*/}
            {/*    ></Avatar>*/}
            {/*  ))*/}
            {/*}*/}
            <Avatar size={48}
                    name={item.users[0].firstName}
                    backgroundColor={Colors.$backgroundWarningLight}
                    labelColor={Colors.$textMajor}
              // containerStyle={{marginLeft: -18, opacity: 0.7}}
            ></Avatar>
          </View>
          <View flex
                row
                marginR-12
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0'
                }}
          >
            <View flex
                  left
            >
              <View flex row bottom>
                <View flex left>
                  <Text style={{
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 24,
                    textAlign: 'left',
                  }}> {item.name} </Text>
                </View>
                <View
                  right
                  style={{
                    // minWidth: '20%',
                    maxWidth: '25%',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        lineHeight: 24,
                        color: '#8c8c8c'
                      }}
                    > {"12:30"} </Text>
                  </View>
                </View>
              </View>

              <View flex top row>
                <View flex left>
                  <Text style={{
                    fontWeight: 400,
                    fontSize: 14,
                    color: '#8c8c8c',
                    lineHeight: 24,
                    paddingLeft: 3
                  }}>
                    {/* @ts-ignore*/ }
                    {item.lastMessages?.at(-1)?.author.firstName + ": " + item.lastMessages?.at(-1)?.text}
                  </Text>
                </View>
                <View right paddingR-4>
                  <Badge label={3}/>
                </View>
              </View>
            </View>
          </View>
        </View>
    )
  }
  return(
    <TouchableWithoutFeedback
      onPress={() =>{Keyboard.dismiss()}}
    >
      <View useSafeArea flex backgroundColor={Colors.background}>
        <View>
          <Text text40 marginT-12 marginL-8> Messages </Text>
        </View>
        <TextField
          marginT-8
          marginL-12
          marginR-12
          placeholder={'Search chats and messages'}
          leadingAccessory={<AntDesign name="search1" size={18} color={'#8c8c8c'} style={{marginRight: 8}}/>}
          fieldStyle={{
            backgroundColor: Colors.background2,
            padding: 10,
            borderRadius: 8,
            borderWidth: 0,
          }}
          style={{fontSize: 16}}
        />
        <GridList data={rooms}
                  renderItem={({item}) => renderMessageList(item)}
                  numColumns={1}
                  itemSpacing={0}
                  style={{
                    paddingTop: Spacings.s2,
                    // backgroundColor: Colors.background2,
                    // minHeight: '100%'
                  }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}