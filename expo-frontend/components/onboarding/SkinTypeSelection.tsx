import { Controller } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";
import { useColorScheme } from "react-native";
import { SkinType } from "@/app/onboarding";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { onboardingStyles } from ".";
import { Image } from 'expo-image';

export const SkinTypeSelection = ({ control }: { control: any }) => {

    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const options = [
        { label: "oily", value: SkinType.OILY, image: require('@/assets/images/oily.jpg') },
        { label: "dry", value: SkinType.DRY, image: require('@/assets/images/dry.jpg') },
        { label: "normal/combination", value: SkinType.NORMAL_COMBINATION, image: require('@/assets/images/normal-combination.jpg') },
        { label: "unsure", value: SkinType.UNSURE, image: require('@/assets/images/unsure.jpg') },
    ];

    return (
        <View>
            <Text>What's your skin type?</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {options.map(option => (
                    <Controller 
                        control={control}
                        name={"skinType"}
                        render={({field : { onChange, value, onBlur } }) => (
                            <TouchableOpacity style={onboardingStyles(theme).imageContainer} onBlur={onBlur} key={option.value} 
                            onPress={() => {
                                setSelectedType(option.value);
                                  onChange(option.value);
                            }}>
                          <View style={onboardingStyles(theme).imageContainer}>
                              <Image source={option.image} style={onboardingStyles(theme).image} />
                          </View>
                          <Text style={onboardingStyles(theme).label}>{option.label}</Text>
                        </TouchableOpacity>
                    )} />
                ))}
            </View>
        </View>
    );
}

const styles = (theme: any) => onboardingStyles(theme);