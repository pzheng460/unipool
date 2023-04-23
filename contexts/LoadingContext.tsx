import React, {createContext, useContext, useEffect, useState} from "react";
import {useColorScheme as useSystemColorScheme} from "react-native";

interface props {
  children: React.ReactNode,
}

interface LoadingContext {
  loading: boolean,
  setLoading: Function,
}

const LoadingContext = createContext<LoadingContext | null>(null);

export const LoadingProvider = ({ children }: props) => {

  const [loading, setLoading] = useState<boolean>(false);


  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  );

}

type loadingHook = [
  loading: boolean,
  setLoading: Function,
]

export const useLoading = (): loadingHook => {
  const context = useContext(LoadingContext);

  if (context === null || context === undefined) {
    throw Error("Hook is not inside of provider!");
  }

  const {loading, setLoading} = context;

  return [loading, setLoading];
}
