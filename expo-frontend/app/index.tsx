import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { StyledButton } from "@/components/common/StyledButton";
import StyledView from "@/components/views/StyledView";
import { Typography } from "@/constants/Typography";
export default function Index() {

    const router = useRouter();
    return <>
        <StyledView>
            <Text style={Typography.h1}>Visage AI</Text>
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