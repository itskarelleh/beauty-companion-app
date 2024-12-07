/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
}

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const palette : ColorPalette = {
  primary: '#292727',
  secondary: 'FFFAF6',
  background: '#FFF'
} as const;

export const Colors = {
  light: {
    text: palette.primary,
    background: palette.background,
    tint: tintColorLight,
    icon: '#292727',
    tabIconDefault: '#292727',
    tabIconSelected: tintColorLight,
    button: {
      background: '#292727',
      text: '#ebe4e4',
      disabledBackground: '#CCCCCC',
      disabledText: '#808080'
    },
    border: {
      default: '#f1f1f1',
      selected: 'lightblue'
    }
  },
  dark: {
    text: palette.secondary,
    background: '#191717',
    tint: tintColorDark,
    icon: palette.primary,
    tabIconDefault: palette.secondary,
    tabIconSelected: tintColorDark,
    button: {
      background: palette.primary,
      text: palette.secondary,
      disabledBackground: '#333333',
      disabledText: '#666666'   
    },
    border: {
      default: '#121212',
      selected: '#444444',
      hover: '#555555'
    }
  },
} as const;
