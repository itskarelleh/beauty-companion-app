import { onboardingStyles } from "@/components/onboarding";
import NineBySixteenCamera from "@/components/NineBySixteenCamera";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useOnboarding } from "@/libs/OnboardingProvider";

export function TakePhoto() {

    const theme = useColorScheme();
    const { state, setState } = useOnboarding();

    const addImage = (image: any) => {
        setState(prev => ({ ...prev, images: [...prev.images, image] }));
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", padding: 28 }}>
            <View style={styles(theme).cameraMessage}>
                <Text>Take a photo of your face</Text>
            </View>
            <NineBySixteenCamera handleImages={addImage} />
            <View>
                {state.images.map((image: any, index: any) => (
                    <Image source={{ uri: image.uri }} key={index} />
                ))}
            </View>
        </View>
    )
}

const styles = (theme: any) => onboardingStyles(theme);