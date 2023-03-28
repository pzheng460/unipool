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
import {Keyboard, TouchableWithoutFeedback, TouchableHighlight} from "react-native";
import {Room, User, MessageType} from "@flyerhq/react-native-firebase-chat-core";
import {floor} from "react-native-reanimated";


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
      type: "text",
      createdAt: 0,
    },

    {
      author: userList[2],
      id: "2",
      text: "Where should we meet?",
      type: "text",
      createdAt: 2,
    },
    {
      author: userList[1],
      id: "1",
      text: "Nice to meet you!",
      type: "text",
      createdAt: 1,
    },
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
        <TouchableHighlight
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ChatScreen',
            {roomMessages: item.lastMessages})}>
          <View
              flex
              row
              style={{
                height: 72,
                borderRadius: 0,
                overflow: 'hidden',
                backgroundColor: Colors.white
              }}

          >
            <View flex-S left centerV
                  padding-12
            >
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
                  // style={{
                  //   borderBottomWidth: 1,
                  //   borderBottomColor: '#f0f0f0'
                  // }}
            >
              <View flex
                    left
              >
                <View flex row bottom>
                  <View flex left>
                    <Text style={{
                      fontWeight: 500,
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
                            fontSize: 13,
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
                      paddingLeft: 4
                    }}>
                      {/* @ts-ignore*/}
                      {item.lastMessages?.at(-1)?.author.firstName + ": " + item.lastMessages?.at(-1)?.text}
                    </Text>
                  </View>
                  <View right paddingR-4>
                    <Badge label={1+Math.floor(Math.random()*5)}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>

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
        <View flex>
          <GridList data={rooms}
                    renderItem={({item}) => renderMessageList(item)}
                    numColumns={1}
                    itemSpacing={0}
                    style={{
                      paddingTop: Spacings.s2,
                      // backgroundColor: Colors.background2,
                      // height: '100%'
                    }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}