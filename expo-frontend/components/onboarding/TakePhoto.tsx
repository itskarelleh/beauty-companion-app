import { onboardingStyles } from "@/components/onboarding";
import NineBySixteenCamera from "@/components/NineBySixteenCamera";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useOnboarding } from "@/libs/OnboardingProvider";
import { useState } from "react";
import { StepContainer } from "./StepContainer";

export function TakePhoto() {

    const theme = useColorScheme();
    const { state, setState } = useOnboarding();
    const [retakeIndex, setRetakeIndex] = useState<number | null>(null);

    const addImage = (image: any) => {
        setState(prev => ({ ...prev, images: [...prev.images, image] }));
        setRetakeIndex(null);
    }

    const retakeImage = (index: number) => {
        setRetakeIndex(index);
        setState(prev => {
            const newImages = [...prev.images];
            newImages.splice(index, 1);
            return { ...prev, images: newImages };
        });
    }

    const instructionMessage = () => {
        if (retakeIndex !== null) {
            switch(retakeIndex) {
              case 0: 
                return "Step 1: Look forward and take a photo.";
              case 1:
                return "Step 2: Turn your head to your left-hand side and take a photo.";
              case 2:
                return "Step 3: Turn your head to your right-hand side and take a photo.";
            }
        } else if (state.images.length < 3) {
            switch(state.images.length) {
              case 0: 
                return "Step 1: Look forward and take a photo.";
              case 1:
                return "Step 2: Turn your head to your left-hand side and take a photo.";
              case 2:
                return "Step 3: Turn your head to your right-hand side and take a photo.";
            }
        } else {
            return "Click on an image to retake it.";
        }
    }

    return (
        <StepContainer heading={instructionMessage() || undefined}>
            <View style={{ flex: 1, height: '100%'}}>
                <NineBySixteenCamera handleImages={addImage} />
                <View style={{ 
                    flexDirection: 'row', 
                    width: '100%'
                }}>
                    {state.images.map((image: File, index: number) => {

                        const url = URL.createObjectURL(image);

                        return (
                            <TouchableOpacity
                                key={index} 
                                style={{ 
                                    width: 90, 
                                    height: 90, 
                                    borderRadius: 8,
                                    backgroundColor: 'lightgray', 
                                    ...(index === 1 && { marginHorizontal: 20 })
                                }}
                                onPress={() => retakeImage(index)}
                            >
                                <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </StepContainer>

    )
}

const styles = (theme: any) => onboardingStyles(theme);