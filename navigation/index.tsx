import {AntDesign} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from "./types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import RegisterScreen from '../screens/RegisterScreen';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../configs/firebase/FirebaseConfig";
import GroupScreen from "../screens/GroupScreen";
import MessageScreen from "../screens/MessageScreen";
import MeScreen from "../screens/MeScreen";
import {Colors} from "react-native-ui-lib";
import TripDetailsScreen from "../screens/TripDetailsScreen";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CreateTripScreen from "../screens/CreateTripScreen";
import RatingScreen from "../screens/RatingScreen";
import RegisterCompleteScreen from "../screens/RegisterCompleteScreen";
import {useColorScheme} from "../contexts/ColorSchemeContext";
import {StatusBar} from "expo-status-bar";
import {Provider as PaperProvider, useTheme} from "react-native-paper";
import {DefaultDarkTheme, DefaultLightTheme} from "../theme/global";
import OnBoardScreenBegin from "../screens/onboard/OnboardScreen-Begin";
import OnBoardScreenEmail from "../screens/onboard/OnboardScreen-Email";
import OnBoardScreenPassword from "../screens/onboard/OnboardScreen-Password";
import WaitingScreen from "../screens/WaitingScreen";
import {useLoading} from "../contexts/LoadingContext";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [scheme, setColorScheme, setUseSystem] = useColorScheme();
  const [loading, setLoading] = useLoading();
  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"}/>
      <PaperProvider theme={scheme === 'dark' ? DefaultDarkTheme : DefaultLightTheme}>
        <NavigationContainer theme={scheme === 'dark' ? DefaultDarkTheme : DefaultLightTheme}>
          {loading && <WaitingScreen/>}
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user,] = useAuthState(auth);

  return (
    user === null || user === undefined ?
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTransparent: true,
          title: "",
        }}
      >
        <Stack.Screen name={'Welcome'} component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name={'Register'} component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name={'OnBoardBegin'} component={OnBoardScreenBegin} />
        <Stack.Screen name={'OnBoardEmail'} component={OnBoardScreenEmail} />
        <Stack.Screen name={'OnBoardPassword'} component={OnBoardScreenPassword} />
        <Stack.Screen name={'Login'} component={LoginScreen} options={{headerShown: false}}/>
        {/*<Stack.Screen name={'RegisterComplete'} component={RegisterCompleteScreen}/>*/}
      </Stack.Navigator> :
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      >
        <Stack.Screen name={'Login'} component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="TripDetails"
                      component={TripDetailsScreen} options={{ headerTitle: 'Trip Details'}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat Room'}}/>
        <Stack.Screen name={'TripCreate1'} component={CreateTripScreen} options={{ headerTransparent: true, title: "" }}/>
        <Stack.Screen name={'Rating'} component={RatingScreen} options={{headerTitle: 'Rate Your Co-Rider'}}/>
        {/*<Stack.Screen name={'RegisterComplete'} component={RegisterCompleteScreen}/>*/}
      </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  // @ts-ignore
  // @ts-ignore
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 56 + insets.bottom,
          backgroundColor: theme.colors.surface,
        },
        tabBarActiveTintColor: theme.colors.inverseSurface,
        //@ts-ignore
        tabBarLabelStyle: {fontSize: 12, fontWeight: 600, marginBottom: 8},
    }}
     >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Groups"
        component={GroupScreen}
        options={({ navigation }: RootTabScreenProps<'Groups'>) => ({
          title: 'Groups',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="addusergroup" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessageScreen}
        options={({ navigation }: RootTabScreenProps<'Messages'>) => ({
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="message1" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Me"
        component={MeScreen}
        options={({ navigation }: RootTabScreenProps<'Me'>) => ({
          title: 'Me',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
  return <AntDesign size={26} style={{ marginBottom: -4 }} {...props} />;
}

