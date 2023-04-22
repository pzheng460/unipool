import {createContext, useEffect, useReducer} from "react";
import {trips, user1} from "./assets/data/dummyData";
import {dummyDataReducer} from "./reducer/DummyDataReducer";
import {GlobalData} from "./reducer/ActionType";
import {ColorSchemeProvider} from "./contexts/ColorSchemeContext";


const initialData: GlobalData = {user: user1, trips: trips};
export const DummyDataContext = createContext({});
export const DummyDataDispatch = createContext({});
export default function AppContextWrapper (props: any) {
  const [data, dispatch] = useReducer(dummyDataReducer, initialData);
  useEffect(() => {
    // console.log(data.trips);
    console.log(data.user)
  }, [data]);
  return (
    <DummyDataContext.Provider value={data}>
      <DummyDataDispatch.Provider value={dispatch}>
        <ColorSchemeProvider>
          {props.children}
        </ColorSchemeProvider>
      </DummyDataDispatch.Provider>
    </DummyDataContext.Provider>
  )
}