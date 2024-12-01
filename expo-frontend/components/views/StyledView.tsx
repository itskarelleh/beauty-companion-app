import { View, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";

export default function StyledView({ children }: { children: React.ReactNode }) {
  const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;

    return <View style={styles(theme).container}>{children}</View>
}

const styles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      padding: 16,
      backgroundColor: '#fff'
    }
});