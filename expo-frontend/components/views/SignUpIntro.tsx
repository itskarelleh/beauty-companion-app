import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from "react-native"
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { FaGoogle, FaFacebook } from 'react-icons/fa6'
import { supabase } from "@/libs/supabase";
import ViewWithBottomButton from "@/components/views/ViewWithBottomButton";
import { StyledButton } from "@/components/common/StyledButton";
import { useRouter } from "expo-router";
import { Typography } from "@/constants/Typography";
import { useForm } from "react-hook-form";
import { useOnboarding } from "@/libs/OnboardingProvider";
import { createThemedStyles } from "@/libs/styles";

type SignUpFormProps = {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function SignUpIntro({ name }: { name: string }) {
    const router = useRouter();

    const { watch, getValues } = useForm<SignUpFormProps>();

    const { setState } = useOnboarding();
    
    const handleSignUp = async (provider?: any) => {
        console.log(getValues());

           try {
            if(watch('email') && watch('password')) {
                const data = await handleSignUpWithEmailPassword();

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

    const handleSignUpWithEmailPassword = async () => {
        console.log('Email and password are valid');
    
        const { data, error } = await supabase.auth.signInWithPassword({
            email: watch('email') as string,
            password: watch('password') as string
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
        setState(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
        }));
    }

    return (
        <View style={styles.container}>
            <View style={styles.signUpContainer}>
                <Text style={styles.title}>Welcome, <br/>{name}</Text>
                <Text style={styles.subtitle}>Sign up to continue</Text>
            </View>
            <View style={styles.authOptionsContainer}>
                <View style={styles.signInButtonContainer}>
                    <StyledButton title="Sign up with email" onPress={handleNext} />
                </View>
                <View style={styles.or}>
                    <View style={styles.orLine} />
                    <Text>or</Text>
                    <View style={styles.orLine} />
                </View>
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => handleSignUp('google')}>
                        <FaGoogle style={styles.socialButtonIcon} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.socialButton} onPress={() => handleSignUp('apple')}>
                        <FaApple style={styles.socialButtonIcon} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.socialButton} onPress={() => handleSignUp('facebook')}>
                        <FaFacebook style={styles.socialButtonIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = createThemedStyles((theme: typeof Colors.light | typeof Colors.dark) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center',
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
}))