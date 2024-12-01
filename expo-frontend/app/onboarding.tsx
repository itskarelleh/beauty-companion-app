import { useState, useEffect, useMemo } from "react";
import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import ViewWithBottomButton from "../components/views/ViewWithBottomButton";
import NineBySixteenCamera from "@/components/NineBySixteenCamera";
import axios from "axios";
import { TextField } from "@/components/TextField";
import { SkinColorSelection, SkinTypeSelection, styles } from "@/components/onboarding";
import SignUpForm from "@/components/views/SignUpForm";
import { supabase } from "@/libs/supabase";
import { Typography } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useForm, Controller, SubmitHandler } from "react-hook-form";


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
    const { control, handleSubmit, watch, formState: { errors } } = useForm<NewUser>();

    const [ images, setImages ] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [analysisResults, setAnalysisResults] = useState<any[]>([]);
    const [ analysisIsLoading, setAnalysisIsLoading ] = useState(false);
    const [isStepValid, setIsStepValid] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;


    const skipToSignUp = () => {
        setCurrentStep(steps.length - 1);
    }

    const onSubmit: SubmitHandler<NewUser> = (data) => {
        console.log(data);
    }

    useEffect(() => {
        validateCurrentStep();
    }, [watch(), images, currentStep]);

    const validateCurrentStep = () => {
        switch (currentStep) {
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
                setIsStepValid(images.length > 0);
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
        <View style={{ width: '100%', padding: 16, gap: 8 }}>
            <Text style={Typography.h3}>What's your first name?</Text>
           <Controller control={control} render={({field : { onChange, value, onBlur } }) => (    
             <TextField
                onBlur={onBlur}
                onChange={onChange}
                placeholder="Name"
                defaultValue={value}
            />
           )} name="name" />
        </View>,
        <View style={{ width: '100%', padding: 16, gap: 8 }}>
            <Text style={Typography.h3}>Nice to meet you, {watch('name')}! What's your age?</Text>
            <Controller control={control} render={({field : { onChange, value, onBlur } }) => (    
             <TextField
                onBlur={onBlur}
                onChange={onChange}
                placeholder="Age"
                defaultValue={value}
                keyboardType="numeric"
            />
           )} name="age" />
        </View>,
        <SkinColorSelection control={control} />,
        <SkinTypeSelection control={control} />,
        <View >
            <Text>Now that we know a bit about you, let's get started with a personalized skincare routine! Let's start with a skin analysis.</Text>
        </View>,
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", padding: 28 }}>
            <View style={styles(themeColorScheme).cameraMessage}>
                <Text>Take a photo of your face</Text>
            </View>
            <NineBySixteenCamera setImages={setImages} />
            <View>
                {images.map((image, index) => (
                    <Image source={{ uri: image }} key={index} />
                ))}
            </View>
        </View>,
        <View>
            {analysisIsLoading && <Text>Loading...</Text>}
            {!analysisIsLoading && <>
                <Text>Results</Text>
                <Text>Here are your results based on the photos you've taken.</Text>
                <Text>
                    {analysisResults}
                </Text>
            </>}
        </View>,
        <View>
            <Text>Great! We've got your skin analysis. Let's save your profile and get started.</Text>
        </View>,
        <View>
            <SignUpForm newUser={watch()} />
        </View>
    ], [watch()]);
    
    const onNext = () => {
        if (currentStep === steps.length - 1) {
            onComplete();
        } else if(currentStep === steps.length - 4) {
            setCurrentStep(currentStep + 1);
            onAnalysisStart(watch());
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const onComplete = () => {
        console.log("onComplete");
    }

    const onAnalysisStart = async (newUser: NewUser) => {
        console.log("onAnalysisStart");

        // Upload all images to the Supabase bucket
        await addImagesToSupabase(images, setImageUrls);

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
                variables: { userProfile: newUser, images: imageUrls }
            });

            setAnalysisIsLoading(true);
            setAnalysisResults(response.data.data.generateSkinAnalysis.content[0].text);
            setAnalysisIsLoading(false);

        } catch (error) {
            console.error('Error during analysis:', error);
            console.log("User profile:", newUser);
            console.log("Images:", imageUrls);
        }
    }

    const analysisReady = (currentStep === steps.length - 3) && (imageUrls.length === 3);

    return (
        <ViewWithBottomButton buttonHidden={analysisReady || !isStepValid} onNext={onNext}>
            {steps[currentStep]}
        </ViewWithBottomButton>
    );
}

const addImagesToSupabase = async (images: string[], setImageUrls: (urls: string[]) => void) => {
    console.log("addImagesToSupabase", images);

    for (const image of images) {

        console.log("image", image);
        const { data, error } = await supabase.storage
            .from('onboarding')
            .upload(`${new Date().getTime()}`, image);

        if (error) {
            console.error('Error uploading image:', error);
        } else {
            console.log('Image uploaded successfully:', data);

            // Get the public URL of the uploaded image
            const { data: { publicUrl }, error: urlError } = supabase.storage
                .from('onboarding')
                .getPublicUrl(data.path);   

            if (urlError) {
                console.error('Error getting public URL:', urlError);
            } else {
                setImageUrls(prevUrls => [...prevUrls, publicUrl]);
            }
        }
    }
}