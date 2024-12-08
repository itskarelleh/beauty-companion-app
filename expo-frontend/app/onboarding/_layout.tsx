import { OnboardingProvider, useOnboarding } from "@/libs/OnboardingProvider";
import { Stack } from "expo-router";
import { Button, TouchableOpacity } from "react-native";


export const unstable_settings = {
    initialRouteName: 'index',
};

export default function OnboardingLayout() {

    return (
        <OnboardingProvider>
            <LayoutStack />
        </OnboardingProvider>
    )
}

function LayoutStack() {

    const { handleBackButtonPress } = useOnboarding();

    return (
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'default'}}>
            <Stack.Screen 
                name="index" 
                options={{
                    headerTitle: "",
                    headerLeft: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={handleBackButtonPress}
                        />
                    ),
                }}
            />
            <Stack.Screen options={{
                headerTitle: "",
                headerBackButtonDisplayMode: 'minimal',
            }} name="signup-email" />
            <Stack.Screen
            name="modal"
            options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerShown: false,
            }} />
        </Stack>
    )
}