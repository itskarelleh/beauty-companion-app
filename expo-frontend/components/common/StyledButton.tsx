import { Colors } from "@/constants/Colors"
import { Typography } from "@/constants/Typography";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { TouchableOpacity, StyleSheet, Text } from "react-native"

interface StyledButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    textColor?: string;
    backgroundColor?: string;
}

export const StyledButton = ({ title, onPress, disabled}: StyledButtonProps) => {

    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark
    
    return (
        <TouchableOpacity disabled={disabled} style={styles(theme).button} onPress={onPress}>
            <Text style={styles(theme).text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = (theme : typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
    button: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.button.background,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    text: {
        color: theme.button.text,
        textAlign: "center",
        fontSize: Typography.button.fontSize,
        fontWeight: 700,
        height: 24,
    }
})