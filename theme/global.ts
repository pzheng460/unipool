import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3DarkTheme, MD3LightTheme} from "react-native-paper";
import deepmerge from "deepmerge";

/**
 * Theme provider by React Navigation.
 * For more info and use cases: https://reactnavigation.org/docs/themes/
 * Useful color tips: https://ant.design/docs/spec/colors-cn
 */
const GlobalThemeLight: Theme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    background: 'rgb(255, 255, 255)',
    text: 'rgba(0, 0, 0, 0.85)',
  },
};

const GlobalThemeDark: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: 'rgb(18, 18, 18)',
    text: 'rgba(255, 255, 255, 0.85)',
  }
}

/**
 * TODO: Theme for React Native Paper
 * https://callstack.github.io/react-native-paper/docs/guides/theming
 * Design Guide: https://m2.material.io/design/color/dark-theme.html#ui-application
 */

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: GlobalThemeLight,
  reactNavigationDark: GlobalThemeDark,
});

const customLightTheme: typeof MD3LightTheme= {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    primary: "#303437",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(220, 220, 220)",
    onPrimaryContainer: "rgb(0, 22, 77)",
    secondary: "rgb(89, 94, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(221, 221, 221)",
    onSecondaryContainer: "rgb(22, 27, 44)",
    tertiary: "rgb(116, 84, 112)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 215, 247)",
    onTertiaryContainer: "rgb(43, 18, 42)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    // +++++++++++++++++++++++++++++++++++++
    background: "rgb(255, 255, 255)",
    onBackground: "rgba(0, 0, 0, 0.85)",
    surface: "rgb(255, 255, 255)",
    onSurface: "rgba(0, 0, 0, 0.85)",
    // +++++++++++++++++++++++++++++++++++++
    surfaceVariant: "rgb(226, 225, 226)",
    onSurfaceVariant: "rgb(69, 70, 79)",
    outline: "rgb(118, 118, 128)",
    outlineVariant: "rgb(198, 198, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(242, 240, 244)",
    inversePrimary: "rgb(181, 196, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(243, 243, 243)",
      level2: "rgb(239, 238, 238)",
      level3: "rgb(233, 233, 233)",
      level4: "rgb(231, 231, 231)",
      level5: "rgb(227, 229, 228)"
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(46, 48, 56, 0.4)"
  }
}

const customDarkTheme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "rgb(181, 196, 255)",
    onPrimary: "rgb(4, 41, 120)",
    primaryContainer: "rgb(38, 65, 144)",
    onPrimaryContainer: "rgb(220, 225, 255)",
    secondary: "rgb(193, 197, 221)",
    onSecondary: "rgb(43, 48, 66)",
    secondaryContainer: "rgb(65, 70, 89)",
    onSecondaryContainer: "rgb(221, 225, 249)",
    // +++++++++++++++++++++++++++++++++++++
    background: "rgb(12, 12, 12)",
    onBackground: "rgba(255, 255, 255, 0.85)",
    surface: "rgb(12, 12, 12)",
    onSurface: "rgba(255, 255, 255, 0.85)",
    // +++++++++++++++++++++++++++++++++++++
    surfaceVariant: "rgb(69, 70, 79)",
    onSurfaceVariant: "rgb(198, 198, 208)",
    outline: "rgb(143, 144, 154)",
    outlineVariant: "rgb(69, 70, 79)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(228, 226, 230)",
    inverseOnSurface: "rgb(48, 48, 52)",
    inversePrimary: "rgb(64, 90, 169)",
    elevation: {
      level0: "transparent",
      level1: "rgb(35, 35, 42)",
      level2: "rgb(39, 41, 49)",
      level3: "rgb(44, 46, 56)",
      level4: "rgb(46, 47, 58)",
      level5: "rgb(49, 51, 62)"
    },
    surfaceDisabled: "rgba(228, 226, 230, 0.12)",
    onSurfaceDisabled: "rgba(228, 226, 230, 0.38)",
    backdrop: "rgba(46, 48, 56, 0.4)"
  }
}

export const DefaultLightTheme = deepmerge(LightTheme, customLightTheme);
export const DefaultDarkTheme = deepmerge(DarkTheme, customDarkTheme);