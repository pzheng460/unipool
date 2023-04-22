import {Text, View, LoaderScreen} from "react-native-ui-lib";
import {GlobalData} from "../reducer/ActionType";
import {DummyDataContext} from "../AppContextWrapper";
import {useContext, useEffect} from "react";
import {RootStackScreenProps} from "../navigation/types";

export default function WaitingScreen({route, navigation}: RootStackScreenProps<'Waiting'>) {
  const data = useContext(DummyDataContext) as GlobalData;

  useEffect(() => {
    if (data !== undefined && data.user !== undefined && data.trips !== undefined) {
      console.log(data);
      // setTimeout(() => {
        navigation.replace("Root");
      // }, 1000);
    }
  }, [data]);
  return (
    <LoaderScreen message={'Loading'}/>
  )
}