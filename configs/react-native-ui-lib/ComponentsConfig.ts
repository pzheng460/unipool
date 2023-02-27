import {ThemeManager} from 'react-native-ui-lib';

// with a dynamic function
// TODO: define custom component style here
ThemeManager.setComponentTheme('Button', (props: { square: any; }, context: any) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 8
    };
  }
});