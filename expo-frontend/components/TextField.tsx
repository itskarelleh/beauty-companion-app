import { Colors } from "@/constants/Colors";
import { KeyboardTypeOptions, 
  NativeSyntheticEvent,
  TextInputChangeEventData, 
  StyleSheet, 
  TextInput, 
  useColorScheme 
} from "react-native";

interface TextFieldProps {
    placeholder: string;
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    defaultValue?: string;
    value?: string;
    keyboardType?: KeyboardTypeOptions,
    type?: 'password' | 'email' | 'text',
    onBlur?: () => void;
}

export function TextField({ placeholder, onChange, defaultValue, value, keyboardType, type, onBlur } : TextFieldProps) {
  const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
  return (
    <TextInput style={[styles(themeColorScheme).textField]} 
    placeholder={placeholder} 
    onChange={onChange} 
    defaultValue={defaultValue} 
    keyboardType={keyboardType}
    secureTextEntry={type === 'password'}
    textContentType={type === 'email' ? 'emailAddress' : type === 'text' ? 'none' : type === 'password' ? 'password' : 'none'}
    value={value} />
  );
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
