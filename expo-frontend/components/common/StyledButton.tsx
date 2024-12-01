import { Colors } from "@/constants/Colors"
import { Typography } from "@/constants/Typography";
import { TouchableOpacity, StyleSheet, Text } from "react-native"

interface StyledButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    textColor?: string;
    backgroundColor?: string;
}

export const StyledButton = ({ title, onPress, disabled}: StyledButtonProps) => {
    return (
        <TouchableOpacity disabled={disabled} style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.light.button.background,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
    },
    text: {
        color: Colors.light.button.text,
        textAlign: "center",
        fontSize: Typography.button.fontSize,
        fontWeight: 700,
    }
})