import { Controller } from "react-hook-form";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useColorScheme } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { onboardingStyles } from ".";
import { Typography } from "@/constants/Typography";
import { StepContainer } from "./StepContainer";
import { createThemedStyles } from "@/libs/styles";

export enum SkinType {
    OILY = "oily",
    DRY = "dry",
    NORMAL_COMBINATION = "normal-combination",
    UNSURE = "unsure"
}

export const SkinTypeSelection = ({ control } : { control: any }) => {
    
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const options = [
        { id:1, label: 'Normal/Combination', value: SkinType.NORMAL_COMBINATION, image: require('@/assets/images/normal-combination.jpg')},
        { id: 2, label: 'Oily', value: SkinType.OILY, image: require('@/assets/images/oily.jpg') },
        { id: 3, label: 'Dry', value: SkinType.DRY, image: require('@/assets/images/dry.jpg') },
        { id: 4, label: 'Unsure', value: SkinType.UNSURE, image: require('@/assets/images/unsure.jpg') }
    ];

    return (
        <StepContainer heading="What's your skin type?">
            {options.map(option => (
                <Controller 
                key={option.id}
                    control={control}
                    name={"skinType"}
                    render={({field : { onChange, onBlur } }) => (
                        <TouchableOpacity style={styles.imageContainer} onBlur={onBlur} key={option.value} 
                        onPress={() => {
                            setSelectedType(option.value);
                                onChange(option.value);
                        }}>
                        <View style={[styles.skinTypeImageContainer, selectedType === option.value && styles.selectedBorder]}>
                            <Image source={option.image} style={styles.skinTypeImage} />
                        </View>
                        <Text style={[Typography.body, ((selectedType === option.value) && styles.selectedText)]}>{option.label}</Text>
                    </TouchableOpacity>
                )} />
            ))}
        </StepContainer>
    );
}

const styles = createThemedStyles((theme: typeof Colors.light | typeof Colors.dark) => ({
    ...onboardingStyles,
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
        fontWeight:  Typography.h1.fontWeight
    },
    selectedBorder: {
        borderColor: theme.border.selected,
        borderWidth: 2
    }
}));