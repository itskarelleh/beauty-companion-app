import { Controller } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";
import { useColorScheme } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { onboardingStyles } from ".";
import { Image } from 'expo-image';
import { Typography } from "@/constants/Typography";

export enum SkinType {
    OILY = "oily",
    DRY = "dry",
    NORMAL_COMBINATION = "normal-combination",
    UNSURE = "unsure"
}

export const SkinTypeSelection = ({ control }: { control: any }) => {

    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;

    // Debugging: Log the theme to ensure it's correct
    console.log('Current theme:', theme);

    // Ensure Colors are defined correctly
    console.log('Selected border color:', theme.border?.selected);
    console.log('Default border color:', theme.border.default);

    const [selectedType, setSelectedType] = useState<string | null>(null);

    const options = [
        { label: "normal/combination", value: SkinType.NORMAL_COMBINATION, image: require('@/assets/images/normal-combination.jpg') },
        { label: "oily", value: SkinType.OILY, image: require('@/assets/images/oily.jpg') },
        { label: "dry", value: SkinType.DRY, image: require('@/assets/images/dry.jpg') },
        { label: "unsure", value: SkinType.UNSURE, image: require('@/assets/images/unsure.jpg') },
    ];

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Text style={[Typography.h2, { marginBottom: 16}]}>What's your skin type?</Text>
            <View>
                {options.map(option => (
                    <Controller 
                        control={control}
                        name={"skinType"}
                        render={({field : { onChange, value, onBlur } }) => (
                            <TouchableOpacity style={styles(theme).imageContainer} onBlur={onBlur} key={option.value} 
                            onPress={() => {
                                setSelectedType(option.value);
                                  onChange(option.value);
                            }}>
                            <View style={[styles(theme).skinTypeImageContainer, selectedType === option.value && styles(theme).selectedBorder]}>
                                <Image source={option.image} style={styles(theme).skinTypeImage} />
                            </View>
                            <Text style={[Typography.body, selectedType === option.value && styles(theme).selectedText]}>{option.label}</Text>
                        </TouchableOpacity>
                    )} />
                ))}
            </View>
        </View>
    );
}

const styles = (theme: any) => ({
    ...onboardingStyles(theme),
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 24
    },
    skinTypeImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 358,
        height: 130,
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: theme.border.default
    },
    skinTypeImage: {
        width: '100%',
        height: '100%',
    },
    label: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        textAlign: 'center',
    },
    selectedText: {
        fontWeight: 700
    },
    selectedBorder: {
        borderColor: theme.border.selected,
        borderWidth: 2
    }
});