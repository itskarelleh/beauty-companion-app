import { View, Button, Text, useColorScheme, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StyledButton } from "@/components/common/StyledButton";
import StyledView from "@/components/views/StyledView";
import { Typography } from "@/constants/Typography";
import { Image } from 'expo-image';
import { Colors } from "@/constants/Colors";
import { Logo } from "@/components/ui/Logo";

export default function Index() {

    const router = useRouter();
    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;

    return <>
        <StyledView>
            <View style={{ 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 8, 
                paddingTop: 56 
                }}>
                <Logo width={200} />
            </View>
            <Text style={style(theme).title}>Visage Pro</Text>
            <Text style={style(theme).subtitle}>Your personal skin coach</Text>
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

const style = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
    title: {
        ...Typography.h1,
        color: theme.text
    },
    subtitle: {
        ...Typography.h2,
        color: theme.text
    }
})