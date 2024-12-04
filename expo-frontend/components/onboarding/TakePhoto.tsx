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
        <View style={{ 
            justifyContent: "center", 
            alignItems: "center", 
            display: "flex", 
            flexDirection: "column",
            width: "100%", 
            padding: 28 
        }}>
            <View style={styles(theme).cameraMessage}>
                <Text>Take a photo of your face</Text>
            </View>
            <NineBySixteenCamera handleImages={addImage} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', gap: 4 }}>
                {state.images.map((image: any, index: any) => {
                    return (
                        <View key={index} style={{ width: 90, height: 160, backgroundColor: 'lightgray' }}>
                            <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%' }} />
                        </View>
                    );
                })}
            </View>
        </View>
    )
}

const styles = (theme: any) => onboardingStyles(theme);