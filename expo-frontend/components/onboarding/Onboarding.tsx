import React, { useEffect, useMemo, useState } from "react";
import { View, useColorScheme } from "react-native";
import { 
    OnboardingIntro,
    SkinColorSelection, 
    SkinTypeSelection, 
    AgeField, 
    NameField, 
    TakePhoto, 
    SkinAnalysisPrep 
} from "@/components/onboarding";
import { StyledText as Text } from '@/components/common/StyledText'
import SignUpIntro from "@/components/views/SignUpIntro";
import SignUpEmailForm from "@/components/views/SignUpEmailForm";
import { Colors } from "@/constants/Colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";
import { useOnboarding } from "@/libs/OnboardingProvider";
import axios from "axios";
import ViewWithBottomButton from "@/components/views/ViewWithBottomButton";
import { supabase } from "@/libs/supabase";
import { StepContainer } from "./StepContainer";
import { createThemedStyles } from "@/libs/styles";

// Type definitions for user data and skin analysis results
type NewUser = {
    name: string;
    age: string;
    skinTone: string;
    skinType: string;
    skinAnalysis?: SkinAnalysis;
}

type SkinAnalysis = {
    content: any,
    images: string[],
}

export function Onboarding() {

    // URL for the GraphQL endpoint
    const url : string = process.env.EXPO_PUBLIC_MODUS_GRAPHQL_ENDPOINT || '';

    // Form handling using react-hook-form
    const { 
        control, 
        handleSubmit, 
        watch, 
        setValue, 
        formState: { errors } 
    } = useForm<NewUser>();

    // Router for navigation
    const router = useRouter();

    // Onboarding state management
    const { state, setState, TAKE_PHOTO_STEP_INDEX } = useOnboarding();    

    // Determine theme based on color scheme
    const theme = useColorScheme() === 'light' ? Colors.light : Colors.dark;


    // Function to skip to the sign-up step
    const skipToSignUp = () => {
        setState(prev => ({ ...prev, currentStep: steps.length - 1 }));
    }

    // Effect to validate the current step whenever images or current step changes
    useEffect(() => {
        validateCurrentStep();
    }, [state.images, state.currentStep]);

    // Effect to watch form changes and validate steps
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'name' && value.name) {
                setValue('age', '');
            }
            validateCurrentStep();
        });

        return () => subscription.unsubscribe();
    }, [state.images, state.currentStep]);

    // Function to validate the current step based on user input
    const validateCurrentStep = () => {
        switch (state.currentStep) {
            case 1:
                setState(prev => ({ ...prev, isStepValid: (watch('name') || '').length > 0 }));
                break;
            case 2:
                setState(prev => ({ ...prev, isStepValid: /^\d+$/.test(watch('age') || '') }));
                break;
            case 3:
                const skinTone = watch('skinTone');
                console.log('Current skinTone:', skinTone);
                setState(prev => ({ ...prev, isStepValid: (skinTone || '').length > 0 }));
                break;
            case 4:
                setState(prev => ({ ...prev, isStepValid: (watch('skinType') || '').length > 0 }));
                break;
            case TAKE_PHOTO_STEP_INDEX:
                setState(prev => ({ ...prev, isStepValid: state.images.length === 3 }));
                break;
            case TAKE_PHOTO_STEP_INDEX + 1:
                setState(prev => ({ ...prev, isStepValid: state.analysisIsLoading === false }));
                break;
            default:
                setState(prev => ({ ...prev, isStepValid: true }));
        }
    };

    // Steps in the onboarding process
    const steps = useMemo(() => [
        <OnboardingIntro />,//0
        <NameField control={control} watch={watch} />,
        <AgeField control={control} watch={watch} />,
        <SkinColorSelection control={control} />,
        <SkinTypeSelection control={control} />,
        <SkinAnalysisPrep />,
        <TakePhoto />,
        <StepContainer heading="Results">
            {state.analysisIsLoading && <Text>Loading...</Text>}
            {!state.analysisIsLoading && <>
                <Text>Here are your results based on the photos you've taken.</Text>
                <Text>
                    {state.analysisResults}
                </Text>
            </>}
        </StepContainer>,
        <StepContainer heading="You're almost done!">
            <Text>
                To continue using Visage to track your skincare progress with our help, let's 
                get you signed up and save your profile.
            </Text>
        </StepContainer>,
        <SignUpIntro name={watch('name')} />,
        <SignUpEmailForm newUser={watch()} />
    ], []);
    
    // Function to proceed to the next step or start analysis
    const onNext = () => {
        if (state.currentStep === steps.length - 1) {
            onComplete();
        } else if(state.currentStep === TAKE_PHOTO_STEP_INDEX) {
            setState(prev => ({ ...prev, currentStep: state.currentStep + 1 }));
            onAnalysisStart({
                name: watch('name'),
                age: watch('age'),
                skinTone: watch('skinTone'),
                skinType: watch('skinType')
            });
        } else {
            setState(prev => ({ ...prev, currentStep: state.currentStep + 1 }));
        }
    };

    // Placeholder function for when onboarding is complete
    const onComplete = () => {
        console.log("onComplete");
    }

    // Function to start skin analysis by uploading images and making a request
    const onAnalysisStart = async (newUser: NewUser) => {

        //set analysis loading to false

        // Update all images to file system for temporary storage
        const imageDataArray : { path: string, data: Blob }[] = await addImagesToTemporaryBucket(state.images);

        setValue('skinAnalysis.images', imageDataArray.map(imageData => imageData.path));

        try {
            const response = await axios.post(url, {
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
                variables: { userProfile: newUser, images: imageDataArray.map(imageData => imageData.path) }
            });

            setState(prev => ({ ...prev, analysisIsLoading: true }));
            setState(prev => ({ ...prev, analysisResults: response.data.data.generateSkinAnalysis.content[0].text }));
            setState(prev => ({ ...prev, analysisIsLoading: false }));

        } catch (error) {
            console.error('Error during analysis:', error);
            console.log("User profile:", newUser);
            console.log("Images:", watch('skinAnalysis.images'));
        }
    }

    // Render the current step with a button to proceed
    return (
        <ViewWithBottomButton 
            buttonText={((state.analysisReady && state.currentStep === 5) ? 'Start Analysis' : 'Next') || 
                (state.currentStep === 0 && 'Let\'s get started!')} 
            buttonHidden={!state.isStepValid || state.currentStep === 9} 
            onNext={onNext}>
            {steps[state.currentStep]}
        </ViewWithBottomButton>
    );
}

// Interface for image data
interface ImageData {
    path: string,
    data: Blob
}

// Function to upload images to a temporary storage bucket
const addImagesToTemporaryBucket = async (images: File[]) => {
    const imageDataArray: ImageData[] = [];

    const TEMP_BUCKET = 'temp';

    for (const image of images) {
        const { data, error } = await supabase.storage.from(TEMP_BUCKET)
        .upload(`${image.name}`, image);

        if (error) {
            console.error('Error uploading image:', error);
        } else {
            console.log('Image uploaded successfully:', data);

            // Fetch the image data from the storage
            const { data: imageData, error: fetchError } = await supabase.storage.from(TEMP_BUCKET)
            .download(data?.path || '');

            if (fetchError) {
                console.error('Error fetching image data:', fetchError);
            } else {
                console.log('Image data fetched successfully:', imageData);
                imageDataArray.push({ path: data?.path || '', data: imageData });
            }
        }
    }

    return imageDataArray;
}

const styles = createThemedStyles((theme: typeof Colors.light | typeof Colors.dark) => ({
    // Define your styles here if needed
}));