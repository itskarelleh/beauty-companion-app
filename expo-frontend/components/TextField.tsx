import { Colors } from "@/constants/Colors";
import { KeyboardTypeOptions, StyleSheet, TextInput, useColorScheme } from "react-native";

interface TextFieldProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    defaultValue?: string;
    value?: string;
    keyboardType?: KeyboardTypeOptions,
    props?: TextFieldProps
}
export default function TextField({ placeholder, onChangeText, defaultValue, value, keyboardType, ...props } : TextFieldProps) {
  const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
  return <TextInput style={[styles(themeColorScheme).textField]} 
  placeholder={placeholder} 
  onChangeText={onChangeText} 
  defaultValue={defaultValue} 
  value={value} />;
}

const styles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
  textField: {
    width: "100%",
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    borderColor: theme.border
  },
});
