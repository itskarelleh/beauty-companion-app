import React, { useState, useEffect, useMemo } from "react";
import { View, Text, useColorScheme } from "react-native";
import { SkinColorSelection, SkinTypeSelection, AgeField, NameField, TakePhoto } from "@/components/onboarding";
import SignUpIntro from "@/components/views/SignUpIntro";
import SignUpEmailForm from "@/components/views/SignUpEmailForm";
import { supabase } from "@/libs/supabase";
import { Typography } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";
import { OnboardingProvider, useOnboarding } from "@/libs/OnboardingProvider";
import axios from "axios";
import ViewWithBottomButton from "@/components/views/ViewWithBottomButton";

type NewUser = {
    name: string;
    age: string;
    skinTone: string;
    skinType: string;
    skinAnalysis: SkinAnalysis;
}

type SkinAnalysis = {
    content: any,
    images: string[],
}

export function Onboarding() {
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<NewUser>();
    const router = useRouter();

    const { state, setState } = useOnboarding();    

    const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;

    const skipToSignUp = () => {
        setState(prev => ({ ...prev, currentStep: steps.length - 1 }));
    }

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);

        //pass data to signup-email
        router.push({ pathname: '/signup-email', params: { newUser: data }});
    }

    useEffect(() => {
        validateCurrentStep();
    }, [state.images, state.currentStep]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'name' && value.name) {
                setValue('age', '');
            }
            validateCurrentStep();
        });

        return () => subscription.unsubscribe();
    }, [state.images, state.currentStep]);

    const validateCurrentStep = () => {
        switch (state.currentStep) {
            case 1:
                setState(prev => ({ ...prev, isStepValid: (watch('name') || '').length > 0 }));
                break;
            case 2:
                setState(prev => ({ ...prev, isStepValid: /^\d+$/.test(watch('age') || '') }));
                break;
            case 3:
                setState(prev => ({ ...prev, isStepValid: (watch('skinTone') || '').length > 0 }));
                break;
            case 4:
                setState(prev => ({ ...prev, isStepValid: (watch('skinType') || '').length > 0 }));
                break;
            case 6:
                setState(prev => ({ ...prev, isStepValid: state.images.length > 0 }));
                break;
            default:
                setState(prev => ({ ...prev, isStepValid: true }));
        }
    };

    const steps = useMemo(() => [
        <View style={{ width: '100%', padding: 16, gap: 8 }}>
            <Text style={Typography.h2}>Welcome to Visage Pro AI!</Text>
            <Text style={Typography.body}>To get started, tell me a bit about yourself.</Text>
        </View>,
        <NameField control={control} watch={watch} />,
        <AgeField control={control} watch={watch} />,
        <SkinColorSelection control={control} />,
        <SkinTypeSelection control={control} />,
        <View >
            <Text>Now that we know a bit about you, let's get started with a personalized skincare routine! Let's start with a skin analysis.</Text>
        </View>,
        <TakePhoto  />,
        <View>
            {state.analysisIsLoading && <Text>Loading...</Text>}
            {!state.analysisIsLoading && <>
                <Text>Results</Text>
                <Text>Here are your results based on the photos you've taken.</Text>
                <Text>
                    {state.analysisResults}
                </Text>
            </>}
        </View>,
        <View>
            <Text>Great! We've got your skin analysis. Let's save your profile and get started.</Text>
        </View>,
        <SignUpIntro name={watch('name')} />,
        <SignUpEmailForm onSubmit={onSubmit} newUser={watch()} />
    ], [watch()]);
    
    const onNext = () => {
        if (state.currentStep === steps.length - 1) {
            onComplete();
        } else if(state.currentStep === steps.length - 4) {
            setState(prev => ({ ...prev, currentStep: state.currentStep + 1 }));
            onAnalysisStart(watch());
        } else {
            setState(prev => ({ ...prev, currentStep: state.currentStep + 1 }));
        }
    };

    const onComplete = () => {
        console.log("onComplete");
    }

    const onAnalysisStart = async (newUser: NewUser) => {
        console.log("onAnalysisStart");

        // Upload all images to the Supabase bucket
        const imageUrls = await addImagesToSupabase(state.images);

        setValue('skinAnalysis.images', imageUrls);

        try {
            const response = await axios.post('http://localhost:8686/graphql', {
                query: `
                    query($userProfile: UserProfileInput!, $images: [String!]!) {
                        generateSkinAnalysis(userProfile: $userProfile, images: $images) {
                            id
                            content {
                                type
                                text
                                id
                                input
                                name
                            }
                            model
                            role
                            stopReason
                            stopSequence
                            type
                            usage {
                                inputTokens
                                outputTokens
                            }
                        }
                    }
                `,
                variables: { userProfile: newUser, images: state.images }
            });

            setState(prev => ({ ...prev, analysisIsLoading: true }));
            setState(prev => ({ ...prev, analysisResults: response.data.data.generateSkinAnalysis.content[0].text }));
            setState(prev => ({ ...prev, analysisIsLoading: false }));

        } catch (error) {
            console.error('Error during analysis:', error);
            console.log("User profile:", newUser);
            console.log("Images:", state.images);
        }
    }

    const analysisReady = (state.currentStep === steps.length - 3) && (state.images.length === 3);
    
    const onBack = () => {
        if (state.currentStep > 0) {
            setState(prev => ({ ...prev, currentStep: state.currentStep - 1 }));
        }
    };

    return (
        <OnboardingProvider>
            <ViewWithBottomButton buttonHidden={analysisReady || !state.isStepValid || state.currentStep === 9} onNext={onNext} onBack={onBack}>
                {steps[state.currentStep]}
            </ViewWithBottomButton>
        </OnboardingProvider>
    );
}

const addImagesToSupabase = async (images: string[]) => {
    const imageUrls = [];

    const SUPABASE_BUCKET_TEMP = 'onboarding';

    for (const image of images) {
        console.log("image", image);

        const { data, error } = await supabase.storage
            .from(SUPABASE_BUCKET_TEMP)
            .upload(`${new Date().getTime()}`, image);

        console.log("image upload data", data);

        if (error) {
            console.error('Error uploading image:', error);
        } else {
            const { data: { publicUrl }} = supabase.storage
                .from(SUPABASE_BUCKET_TEMP)
                .getPublicUrl(data.path);   

            imageUrls.push(publicUrl);
        }
    }

    return imageUrls;
}