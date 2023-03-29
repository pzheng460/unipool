import {useReducer, createContext, useEffect} from "react";
import {trips, user1} from "./assets/data/dummyData";
import {User} from "./Interface/TripInterface";
import {dummyDataReducer} from "./reducer/DummyDataReducer";
import {GlobalData} from "./reducer/ActionType";


const initialData: GlobalData = {user: user1, trips: trips};
export const DummyDataContext = createContext({});
export const DummyDataDispatch = createContext({});
export default function AppContextWrapper (props: any) {
  const [data, dispatch] = useReducer(dummyDataReducer, initialData);
  // useEffect(() => {
  //   console.log(data.trips);
  //   console.log(data.user)
  // }, [data])
  return (
    <DummyDataContext.Provider value={data}>
      <DummyDataDispatch.Provider value={dispatch}>
        {props.children}
      </DummyDataDispatch.Provider>
    </DummyDataContext.Provider>
  )
}