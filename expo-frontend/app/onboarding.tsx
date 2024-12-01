import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import ViewWithBottomButton from "../components/views/ViewWithBottomButton";
import NineBySixteenCamera from "@/components/NineBySixteenCamera";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import TextField from "@/components/TextField";
import { ColorSelection, SkinTypeSelection, styles } from "@/components/onboarding";

export default function Onboarding() {
    const [ newUser, setNewUser ] = useState({
        name: "",
        age: "",
        skinTone: "",
        skinType: ""
    });

    const [ images, setImages ] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [analysisResults, setAnalysisResults] = useState<any[]>([]);
    const [ analysisIsLoading, setAnalysisIsLoading ] = useState(false);
    const [isStepValid, setIsStepValid] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setNewUser(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    useEffect(() => {
        validateCurrentStep();
    }, [newUser, images, currentStep]);

    const validateCurrentStep = () => {
        switch (currentStep) {
            case 1:
                setIsStepValid(newUser.name.trim().length > 0);
                break;
            case 2:
                setIsStepValid(/^\d+$/.test(newUser.age));
                break;
            case 3:
                setIsStepValid(newUser.skinTone.trim().length > 0);
                break;
            case 4:
                setIsStepValid(newUser.skinType.trim().length > 0);
                break;
            case 6:
                setIsStepValid(images.length > 0);
                break;
            default:
                setIsStepValid(true);
        }
    };

    const [ steps, setSteps ] = useState([
        <View>
            <Text>Welcome to Beauty Companion! The app that helps you look your best.</Text>
            <Text>First, tell me about yourself</Text>
        </View>,
        <View>
            <Text>What's your name?</Text>
            <TextField
                placeholder="Name"
                defaultValue={newUser.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
        </View>,
        <View>
            <Text>What's your age?</Text>
            <TextField
                placeholder="Age"
                defaultValue={newUser.age}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('age', text)}
            />
        </View>,
        <ColorSelection onChange={(value) => handleInputChange('skinTone', value)} />,
        <SkinTypeSelection onChange={(value) => handleInputChange('skinType', value)} />,
        <View >
            <Text>Now that we know a bit about you, let's get started with a personalized skincare routine! Let's start with a skin analysis.</Text>
        </View>,
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", padding: 28 }}>
            <View style={styles.cameraMessage}>
                <Text>Take a photo of your face</Text>
            </View>
            <NineBySixteenCamera onTakePhoto={(image : string) => {
                setImages([...images, image]);
            }} />
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
        </View>
    ])



  const onNext = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else if(currentStep === steps.length - 3) {
      setCurrentStep(currentStep + 1);
      onAnalysisStart(newUser);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const onComplete = () => {
    console.log("onComplete");
  }

  const onAnalysisStart = async (newUser: { name: string, age: string, skinTone: string, skinType: string }) => {
    console.log("onAnalysisStart");

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
        variables: { userProfile: newUser, images: images }
      });

      setAnalysisIsLoading(true);

      setAnalysisResults(response.data.data.generateSkinAnalysis.content[0].text);

      setAnalysisIsLoading(false);
    } catch (error) {
      console.error('Error during analysis:', error);
        console.log("User profile:", newUser);
        console.log("Images:", images);
    }
}

    const analysisReady = (currentStep === steps.length - 3) && (images.length === 3);

    return (
        <ViewWithBottomButton buttonHidden={analysisReady || !isStepValid} onNext={onNext}>
            {steps[currentStep]}
        </ViewWithBottomButton>
    );
}
