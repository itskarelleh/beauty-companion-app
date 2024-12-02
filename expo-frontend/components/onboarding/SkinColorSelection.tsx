import { useColorScheme } from "react-native";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Typography } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { onboardingStyles } from "./index";

export const SkinColorSelection = ({ control }: { control: any }) => {
    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const generateSwatches = () => {
        const swatches = [];
        for (let i = 0; i < 25; i++) {

            const hue = 30; // A hue around 30 is often used for skin tones
            const saturation = 30 + i * 1.5; // Slightly increase saturation
            const lightness = 20 + i * 3; // Start from darker tones and increase lightness
            const colorValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            swatches.push(
                <Controller
                    key={i}
                    control={control}
                    name={`skinTone`}
                    render={({ field: { onChange, onBlur } }) => (
                        <TouchableOpacity
                            style={[
                                styles(theme).swatch,
                                { backgroundColor: colorValue },
                                selectedColor === colorValue && styles(theme).selectedSwatch
                            ]}
                            onPress={() => {
                                setSelectedColor(colorValue);
                                onChange(selectedColor);
                            }}
                            onBlur={onBlur}
                        />
                    )}
                />
            );
        }
        return swatches;
    };

    return (
        <View style={{ paddingTop: 52 }}>
            <Text style={Typography.h2}>What's your skin tone?</Text>
            <View style={styles(theme).swatchContainer}>
                {generateSwatches()}
            </View>
        </View>
    );
}

const styles = (theme: any) => onboardingStyles(theme);