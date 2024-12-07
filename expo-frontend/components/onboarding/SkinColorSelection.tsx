import { useColorScheme } from "react-native";
import { Controller, useController } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Typography } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { onboardingStyles } from "./index";
import { StepContainer } from "./StepContainer";
import { createThemedStyles } from "@/libs/styles";

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
                                styles.swatch,
                                { backgroundColor: colorValue },
                                selectedColor === colorValue && styles.selectedSwatch
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
        <StepContainer heading="What's your skin tone?">
            <Text style={[Typography.body, { paddingBottom: 24 }]}>Select the color swatch that best describes your skin.</Text>
            <View style={styles.swatchContainer}>
                {generateSwatches()}
            </View>
        </StepContainer>
    );
}

const styles = createThemedStyles((theme: typeof Colors.light | typeof Colors.dark) => ({
    swatchContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    swatch: {
        width: 45, // Adjust size as needed
        height: 45, // Adjust size as needed
        margin: 10,
        borderRadius: 4,
    },
    selectedSwatch: {
        borderWidth: 2,
        borderColor: theme.border.selected,
    },
}));