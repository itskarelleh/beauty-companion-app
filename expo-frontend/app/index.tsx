import { View, Text, Button, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { StyledButton } from "@/components/common/StyledButton";
import StyledView from "@/components/views/StyledView";
import { Typography } from "@/constants/Typography";
import { Image } from 'expo-image';
import { Colors } from "@/constants/Colors";

export default function Index() {

    const router = useRouter();

    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;

    return <>
        <StyledView>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 56, }}>
                <Image source={require('@/assets/images/logo-dark.png')} style={{ width: 200, height: 200 }} />
            </View>
            <Text style={[Typography.h1, { color: theme.text }]}>Visage Pro</Text>
            <Text style={Typography.body}>Your personal skin coach</Text>
            <View style={{ flexDirection: 'column', width: '100%', gap: 8, paddingTop: 56, }}>
                <StyledButton title="Returning User" onPress={() => {
                    router.push('/login');
                }} />
                <StyledButton title="First Time User" onPress={() => {
                    router.push('/onboarding');
                }} />
            </View>
        </StyledView>
    </>
}