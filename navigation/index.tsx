import {AntDesign, FontAwesome} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from "../types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from '../screens/RegisterScreen';
import {useAuthState} from "react-firebase-hooks/auth";;
import {auth} from "../configs/firebase/FirebaseConfig";
import GroupScreen from "../screens/GroupScreen";
import MessageScreen from "../screens/MessageScreen";
import MeScreen from "../screens/MeScreen";
import {Colors} from "react-native-ui-lib";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user, loading, error] = useAuthState(auth);

  return (
    user === null ?
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTransparent: true,
          title: "",
        }}
      >
        <Stack.Screen name={'Welcome'} component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name={'Login'} component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name={'Register'} component={RegisterScreen} options={{headerShown: false}}/>
      </Stack.Navigator> :
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTransparent: true,
          title: "",
        }}
      >
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  // @ts-ignore
  // @ts-ignore
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
     >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        //@ts-ignore
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {fontSize: 11, fontWeight: 600},
        })}
      />
      <BottomTab.Screen
        name="Groups"
        component={GroupScreen}
        //@ts-ignore
        options={({ navigation }: RootTabScreenProps<'Groups'>) => ({
          title: 'Groups',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="addusergroup" color={color} />,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {fontSize: 11, fontWeight: 600},
        })}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessageScreen}
        //@ts-ignore
        options={({ navigation }: RootTabScreenProps<'Messages'>) => ({
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="message1" color={color} />,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {fontSize: 11, fontWeight: 600},
        })}
      />
      <BottomTab.Screen
        name="Me"
        component={MeScreen}
        //@ts-ignore
        options={({ navigation }: RootTabScreenProps<'Me'>) => ({
          title: 'Me',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {fontSize: 11, fontWeight: 600},
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}
