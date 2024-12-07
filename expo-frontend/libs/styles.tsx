import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export const createThemedStyles = (styles: any) => {
  const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
  return StyleSheet.create(styles(theme));
};