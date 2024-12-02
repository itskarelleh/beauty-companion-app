import { onboardingStyles } from "@/components/onboarding";
import NineBySixteenCamera from "@/components/NineBySixteenCamera";
import { View, Text } from "react-native";
import { Image } from "expo-image";

export function TakePhoto({ control, watch, images, setImages }: { control: any, watch: any, images: any, setImages: any }) {
    const themeColorScheme = watch("themeColorScheme");

    return (
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", padding: 28 }}>
            <View style={onboardingStyles(themeColorScheme).cameraMessage}>
                <Text>Take a photo of your face</Text>
            </View>
            <NineBySixteenCamera setImages={setImages} />
            <View>
                {images.map((image: any, index: any) => (
                    <Image source={{ uri: image }} key={index} />
                ))}
            </View>
        </View>
    )
}