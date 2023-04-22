import React, {createContext, useContext, useEffect, useState} from "react";
import {useColorScheme as useSystemColorScheme} from "react-native";

interface props {
  children: React.ReactNode,
}

interface ColorSchemeConfig {
  colorScheme: string,
  useSystem: boolean,
  setColorScheme: Function,
  setUseSystem: Function,
}

const SchemeContext = createContext<ColorSchemeConfig | null>(null);

/**
 * Color Scheme Provider, store information about light and dark theme.
 */
export const ColorSchemeProvider = ({ children }: props) => {

  const [colorScheme, setColorScheme] = useState<string>("light");
  const [useSystem, setUseSystem] = useState<boolean>(false);

  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme, setColorScheme])

  return (
    <SchemeContext.Provider value={{colorScheme, setColorScheme, useSystem, setUseSystem}}>
      {children}
    </SchemeContext.Provider>
  );

}

/**
 * Custom hook to get and set user scheme.
 */
type colorSchemeHook = [
  colorScheme: string | null | undefined,
  setColorScheme: Function,
  setUseSystem: Function,
]

export const useColorScheme = (): colorSchemeHook => {
  const context = useContext(SchemeContext);

  if (context === null || context === undefined) {
    throw Error("Hook is not inside of provider!");
  }

  const {colorScheme, setColorScheme, useSystem, setUseSystem} = context;
  const sysScheme = useSystemColorScheme();

  if (useSystem === true) {
    return [sysScheme, setColorScheme, setUseSystem];
  } else {
    return [colorScheme, setColorScheme, setUseSystem];
  }
}
