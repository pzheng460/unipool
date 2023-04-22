import {Image, View} from "react-native";
import {Switch, Text, useTheme} from 'react-native-paper';
import {Button} from "../components";
import {RootStackScreenProps} from "../navigation/types";
import {SafeAreaView} from "react-native-safe-area-context";
import {useColorScheme} from "../contexts/ColorSchemeContext";

const logo = require("../assets/icon.png");

export default function WelcomeScreen({route, navigation}: RootStackScreenProps<'Welcome'>) {

  const theme = useTheme();
  const [scheme, setColorScheme, setUseSystem] = useColorScheme();

  return (
    <SafeAreaView style={{flex: 1, paddingRight: 12, paddingLeft: 12}}>
      <View>
        <Button mode={"text"} style={{alignSelf: "flex-end"}} onPress={() => {navigation.navigate('Login')}}>
          Log In
        </Button>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image source={logo} style={{width: 200, height: 200}}/>
        <View style={{marginTop: 16}}>
          <Text variant="headlineLarge" style={{fontWeight: "bold"}}>Unipool</Text>
        </View>
        <View>
          <Text variant="titleMedium">Wait Less, Save More, Find Friends</Text>
        </View>
      </View>
      <View style={{marginLeft: 12,  marginRight: 12}}>
        <View style={{
          flexDirection: "row",
          marginBottom: 8,
        }}>
          <Switch value={scheme === "dark"} onValueChange={(v) => {
            setColorScheme(v ? "dark" : "light");
          }} theme={theme}/>
          <Text variant="bodyLarge">  Dark Theme</Text>
        </View>
        <View style={{marginBottom: 32}}>
          <Button onPress={() => navigation.navigate("OnBoardBegin")}>
            Get Started
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}