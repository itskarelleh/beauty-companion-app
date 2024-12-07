import { View, Text, StyleSheet } from "react-native";
import { Typography } from "@/constants/Typography";
import { Colors } from '@/constants/Colors'
import { createThemedStyles } from "@/libs/styles";
export function OnboardingIntro() {

    return (
        <View style={styles.container}>
            <Text style={[Typography.h1, styles.text]}>Welcome to Visage Pro AI!</Text>
            <Text style={[Typography.h2, { paddingTop: 24 }, styles.text]}>To get started, tell me a bit about yourself.</Text>
        </View>
    )
}

const styles = createThemedStyles((theme : typeof Colors.light | typeof Colors.dark ) => ({
    container: {
        width: '100%'
    },
    text: {
        color: theme.text
    }
}))