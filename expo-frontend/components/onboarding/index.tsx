import { View, Text, TouchableOpacity, Image, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Controller } from "react-hook-form";
import { SkinType } from "@/app/onboarding";
import React, { useState } from 'react';
import { Typography } from "@/constants/Typography";

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
                            <TouchableOpacity style={styles(theme).imageContainer} onBlur={onBlur} key={option.value} 
                            onPress={() => {
                                setSelectedType(option.value);
                                  onChange(option.value);
                            }}>
                          <View style={styles(theme).imageContainer}>
                              <Image source={option.image} style={styles(theme).image} />
                          </View>
                          <Text style={styles(theme).label}>{option.label}</Text>
                        </TouchableOpacity>
                    )} />
                ))}
            </View>
        </View>
    );
}

export const styles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
    container: {
      flex: 1
    },
    bottomButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    bottomButton: {
      flex: 1,
      width: "100%",
      backgroundColor: theme?.button?.background,
    },
    cameraMessage: {
      paddingBottom: 10,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      color: theme?.button?.text,
    },
    imageContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    image: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#F1F1F1',
    },
    label: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    swatchContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // maxWidth: 170,
    },
    swatch: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        margin: 10,
        borderRadius: 4,
    },
    selectedSwatch: {
        borderWidth: 2,
        borderColor: 'lightblue',
    },
  });