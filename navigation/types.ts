/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MessageType} from "@flyerhq/react-native-chat-ui";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  Register: undefined;
  RegisterComplete: undefined;
  Welcome: undefined;
  TripDetails: {id: string} | undefined;
  TripCreate1: undefined;
  ChatScreen: {roomMessages: MessageType.Text[]};
  Rating: {userId: string} | undefined;
  OnBoardBegin: undefined;
  OnBoardEmail: undefined;
  OnBoardPassword: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Groups: undefined;
  Messages: undefined;
  Me: undefined;
  ChatScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;