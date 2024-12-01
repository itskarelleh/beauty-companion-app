import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from "react-native"
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { FaGoogle, FaFacebook } from 'react-icons/fa6'
import { supabase } from "@/libs/supabase";
import ViewWithBottomButton from "@/components/views/ViewWithBottomButton";
import { StyledButton } from "@/components/common/StyledButton";
import { useRouter } from "expo-router";
import { Typography } from "@/constants/Typography";

const getRandomGreeting = () => {
    const greetings = [
        'Hello\nBeautiful!',
        'Hi there\nGorgeous!',
        'Hey\nStunning!',
        'Greetings\nRadiant One!',
        'Welcome\nLovely!',
        'Hi\nWonderful!',
        'Hello\nAmazing!',
        'Hey\nFabulous!',
        'Greetings\nCharming!',
        'Welcome\nMagnificent!'
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
};

export default function SignUpForm({ newUser }: { newUser: any }) {
    const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailPasswordForm, setIsEmailPasswordForm] = useState(false);

    const handleSignUp = async (provider?: any) => {
        console.log(email, password, confirmPassword);

           try {
            if(email && password) {
                const data = await handleSignInWithEmailPassword();

                if(data.error) {
                    console.log(data.error);
                }
            }

            if(provider) {
                const data = await handleSignInWithProvider(provider);

                if(data.error) {
                    console.log(data.error);
                }
            }
           } catch (error) {
            console.log(error);
           }
    }

    const handleSignInWithEmailPassword = async () => {
        console.log('Email and password are valid');
    
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        return { data, error };
    }

    const handleSignInWithProvider = async (provider: any) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider
        });

        return { data, error };
    }

    const handleNext = (type?: string) => {
        console.log('Next');

        if(type === 'emailpassword-form') {
            setIsEmailPasswordForm(true);
        }
    }

    return (
        <ViewWithBottomButton buttonHidden={!isEmailPasswordForm} onNext={() => handleNext()}>
            <View style={styles(themeColorScheme).container}>
                <View style={styles(themeColorScheme).signUpContainer}>
                    <Text style={styles(themeColorScheme).title}>Welcome, {newUser?.name}!</Text>
                    <Text style={styles(themeColorScheme).subtitle}>Login to your account <br/>to continue</Text>
                </View>

                <View style={styles(themeColorScheme).authOptionsContainer}>
                    <View style={styles(themeColorScheme).signInButtonContainer}>
                        <StyledButton title="Login with email" onPress={() => router.push('/login-email')} />
                    </View>
                    <View style={styles(themeColorScheme).or}>
                        <View style={styles(themeColorScheme).orLine} />
                        <Text>or</Text>
                        <View style={styles(themeColorScheme).orLine} />
                    </View>
                    <View style={styles(themeColorScheme).socialButtons}>
                        <TouchableOpacity style={styles(themeColorScheme).socialButton} onPress={() => handleSignUp('google')}>
                            <FaGoogle style={styles(themeColorScheme).socialButtonIcon} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles(themeColorScheme).socialButton} onPress={() => handleSignUp('apple')}>
                            <FaApple style={styles(themeColorScheme).socialButtonIcon} />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles(themeColorScheme).socialButton} onPress={() => handleSignUp('facebook')}>
                            <FaFacebook style={styles(themeColorScheme).socialButtonIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ViewWithBottomButton>
    )
}

const styles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        flex: 1
    },
    title: {
        fontSize: Typography.h1.fontSize,
        fontWeight: Typography.h1.fontWeight,
        letterSpacing: Typography.h1.letterSpacing
    },
    subtitle: {
        fontSize: Typography.h2.fontSize,
        fontWeight: Typography.h2.fontWeight
    },
    signUpContainer: {
        display: 'flex',
        paddingTop: 48,
        width: '100%'
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8
    },
    signInButtonContainer: {
        paddingTop: 42,
        width: '100%'
    },
    signInButtonText: {
        textAlign: 'center',
        fontWeight: 700,
        paddingBottom: 24
    },
    or: {
        textAlign: 'center',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        gap: 8
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.border
    },
    socialButton: {
        padding: 8,
        borderRadius: '100%',
        backgroundColor: theme.background,
        width: 36,
        height: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialButtonIcon: {
        fontSize: 24,
        color: theme.text
    },
    authOptionsContainer: {
        width: '100%',
        gap: 8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})