import { useState, useEffect, useMemo } from "react";
import { View, Text, useColorScheme } from "react-native";
import ViewWithBottomButton from "../components/views/ViewWithBottomButton";
import axios from "axios";
import { SkinColorSelection, SkinTypeSelection, AgeField, NameField, TakePhoto } from "@/components/onboarding";
import SignUpForm from "@/components/views/SignUpForm";
import { supabase } from "@/libs/supabase";
import { Typography } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";

type NewUser = {
    name: string;
    age: string;
    skinTone: string;
    skinType: string;
}

export enum SkinType {
    OILY = "oily",
    DRY = "dry",
    NORMAL_COMBINATION = "normal-combination",
    UNSURE = "unsure"
}

export default function Onboarding() {
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<NewUser>();
    const router = useRouter();
    
    // Combine related states into a single object
    const [state, setState] = useState({
        images: [] as string[],
        currentStep: 0,
        analysisResults: [] as any[],
        analysisIsLoading: false,
        isStepValid: false,
        imageUrls: [] as string[],
    });

    const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;

    // Example of how to update a specific state
    const setImages = (images: string[]) => setState(prev => ({ ...prev, images }));
    const setCurrentStep = (currentStep: number) => setState(prev => ({ ...prev, currentStep }));
    const setAnalysisResults = (analysisResults: any[]) => setState(prev => ({ ...prev, analysisResults }));
    const setAnalysisIsLoading = (analysisIsLoading: boolean) => setState(prev => ({ ...prev, analysisIsLoading }));
    const setIsStepValid = (isStepValid: boolean) => setState(prev => ({ ...prev, isStepValid }));
    const setImageUrls = (imageUrls: string[]) => setState(prev => ({ ...prev, imageUrls }));

    const skipToSignUp = () => {
        setCurrentStep(steps.length - 1);
    }

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);

        //pass data to signup-email
        router.push({ pathname: '/signup-email', params: { newUser: data }});
    }

    useEffect(() => {
        validateCurrentStep();
    }, [watch(), state.images, state.currentStep]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'name' && value.name) {
                setValue('age', '');
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const validateCurrentStep = () => {
        switch (state.currentStep) {
            case 1:
                setIsStepValid((watch('name') || '').length > 0);
                break;
            case 2:
                setIsStepValid(/^\d+$/.test(watch('age') || ''));
                break;
            case 3:
                setIsStepValid((watch('skinTone') || '').length > 0);
                break;
            case 4:
                setIsStepValid((watch('skinType') || '').length > 0);
                break;
            case 6:
                setIsStepValid(state.images.length > 0);
                break;
            default:
                setIsStepValid(true);
        }
    };

    console.log("newUser", watch());

    const steps = useMemo(() => [
        <View style={{ width: '100%', padding: 16, gap: 8 }}>
            <Text style={Typography.h2}>Welcome to Visage AI!</Text>
            <Text style={Typography.body}>To get started, tell me a bit about yourself.</Text>
        </View>,
        <NameField control={control} watch={watch} />,
        <AgeField control={control} watch={watch} />,
        <SkinColorSelection control={control} />,
        <SkinTypeSelection control={control} />,
        <View >
            <Text>Now that we know a bit about you, let's get started with a personalized skincare routine! Let's start with a skin analysis.</Text>
        </View>,
        <TakePhoto control={control} watch={watch} images={state.images} setImages={setImages} />,
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
        <SignUpForm onSubmit={onSubmit} newUser={watch()} />
    ], [watch()]);
    
    const onNext = () => {
        if (state.currentStep === steps.length - 1) {
            onComplete();
        } else if(state.currentStep === steps.length - 4) {
            setCurrentStep(state.currentStep + 1);
            onAnalysisStart(watch());
        } else {
            setCurrentStep(state.currentStep + 1);
        }
    };

    const onComplete = () => {
        console.log("onComplete");
    }

    const onAnalysisStart = async (newUser: NewUser) => {
        console.log("onAnalysisStart");

        // Upload all images to the Supabase bucket
        await addImagesToSupabase(state.images, setImageUrls);

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
                variables: { userProfile: newUser, images: state.imageUrls }
            });

            setAnalysisIsLoading(true);
            setAnalysisResults(response.data.data.generateSkinAnalysis.content[0].text);
            setAnalysisIsLoading(false);

        } catch (error) {
            console.error('Error during analysis:', error);
            console.log("User profile:", newUser);
            console.log("Images:", state.imageUrls);
        }
    }

    const analysisReady = (state.currentStep === steps.length - 3) && (state.imageUrls.length === 3);

    return (
        <ViewWithBottomButton buttonHidden={analysisReady || !state.isStepValid || state.currentStep === 9} onNext={onNext}>
            {steps[state.currentStep]}
        </ViewWithBottomButton>
    );
}

const addImagesToSupabase = async (images: string[], setImageUrls: any) => {
    console.log("addImagesToSupabase", images);

    for (const image of images) {

        console.log("image", image);
        const { data, error } = await supabase.storage
            .from('onboarding')
            .upload(`${new Date().getTime()}`, image);

        if (error) {
            console.error('Error uploading image:', error);
        } else {
            const { data: { publicUrl }} = supabase.storage
                .from('onboarding')
                .getPublicUrl(data.path);   

            setImageUrls((prevUrls: string[]) => [...prevUrls, publicUrl]);
        }
    }
}