/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#292727',
    background: '#FFF8E7',
    tint: tintColorLight,
    icon: '#292727',
    tabIconDefault: '#292727',
    tabIconSelected: tintColorLight,
    button: {
      background: '#292727',
      text: '#d9cdcd',
      disabledBackground: '#CCCCCC',
      disabledText: '#808080'
    },
    border: '#121212',
  },
  dark: {
    text: '#FFF8E7',
    background: '#4A2C2A',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    button: {
      background: '#fff',
      text: '#151718',
    },
    border: '#121212',
  },
};
