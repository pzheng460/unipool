import React, {createContext, useEffect, useReducer} from "react";
import {trips, user1} from "./assets/data/dummyData";
import {dummyDataReducer} from "./reducer/DummyDataReducer";
import {GlobalData} from "./reducer/ActionType";
import {ColorSchemeProvider} from "./contexts/ColorSchemeContext";
import {LoadingProvider} from "./contexts/LoadingContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";


const initialData: GlobalData = {user: user1, trips: trips};
export const DummyDataContext = createContext({});
export const DummyDataDispatch = createContext({});
export default function AppContextWrapper (props: any) {
  const [data, dispatch] = useReducer(dummyDataReducer, initialData);
  useEffect(() => {
    // console.log(data.trips);
    // console.log(data.user);
    console.log(data.user.upcomingTrips);
  }, [data.user.upcomingTrips]);
  return (
    <DummyDataContext.Provider value={data}>
      <DummyDataDispatch.Provider value={dispatch}>
        <ColorSchemeProvider>
          <LoadingProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
            {props.children}
            </GestureHandlerRootView>
          </LoadingProvider>
        </ColorSchemeProvider>
      </DummyDataDispatch.Provider>
    </DummyDataContext.Provider>
  )
}