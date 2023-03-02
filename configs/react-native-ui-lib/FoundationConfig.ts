import {Colors, Typography, Spacings} from 'react-native-ui-lib';

// TODO: Modify theme styles

export function loadColors() {
  Colors.loadColors({
    primary: '#303437',
    secondary: '#6B4EFF',
    text: '#090A0A',
    error: '#FF3141',
    success: '#00B578',
    warn: '#FF8F1F',
    background: '#FFFFFF',
  });
}

// Typography.loadTypographies({
//   heading: {fontSize: 36, fontWeight: '600'},
//   subheading: {fontSize: 28, fontWeight: '500'},
//   body: {fontSize: 18, fontWeight: '400'}
// });c
//
// Spacings.loadSpacings({
//   page: 20,
//   card: 12,
//   gridGutter: 16
// });