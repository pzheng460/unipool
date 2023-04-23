import {LoaderScreen} from "react-native-ui-lib";
import {GlobalData} from "../reducer/ActionType";
import {DummyDataContext} from "../AppContextWrapper";
import {useContext} from "react";
import {useTheme} from "react-native-paper";

export default function WaitingScreen() {
  const theme = useTheme();
  return (
    <LoaderScreen overlay backgroundColor={theme.colors.surface} loaderColor={theme.colors.primary}/>
  )
}