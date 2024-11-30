import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import ViewWithBottomButton from "../components/views/ViewWithBottomButton";
import NineBySixteenCamera from "@/components/NineBySixteenCamera";
import axios from "axios";

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
    
    const handleInputChange = (field: string, value: string) => {
        setNewUser(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const [ steps, setSteps ] = useState([
        <View>
            <Text>Welcome to Beauty Companion! The app that helps you look your best.</Text>
            <Text>First, tell me about yourself</Text>
        </View>,
        <View>
            <Text>What's your name?</Text>
            <TextInput onChangeText={(text) => handleInputChange('name', text)} />
        </View>,
        <View>
            <Text>What's your age?</Text>
            <TextInput
                defaultValue={newUser.age}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('age', text)}
            />
        </View>,
        <ColorSelection onChange={(value) => handleInputChange('skinTone', value)} />,
        <SkinTypeSelection onChange={(value) => handleInputChange('skinType', value)} />,
        <View>
            <Text>Now that we know a bit about you, let's get started with a personalized skincare routine! Let's start with a skin analysis.</Text>
        </View>,
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", padding: 28 }}>
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
            <Text>Results</Text>
            <Text>Here are your results based on the photos you've taken.</Text>
            {/* <Text>{JSON.stringify(analysisResults)}</Text> */}
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

      console.log(response);

      setAnalysisResults(response.data.data.generateSkinAnalysis);
    } catch (error) {
      console.error('Error during analysis:', error);
        console.log("User profile:", newUser);
        console.log("Images:", images);
    }
}

    const analysisReady = (currentStep === steps.length - 3) && (images.length === 3);

    return (
        <ViewWithBottomButton buttonHidden={analysisReady} onNext={onNext}>
            {steps[currentStep]}
        </ViewWithBottomButton>
    );
}

const ColorSelection = ({ onChange }: { onChange: (value: string) => void }) => {
    return (
        <View>
            <Text>What's your skin tone?</Text>
            <Picker onValueChange={(value: string) => onChange(value)}>
                <Picker.Item label="light" value="light" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="dark" value="dark" />
            </Picker>
        </View>
    )
}

const SkinTypeSelection = ({ onChange }: { onChange: (value: string) => void }) => {
    return (
        <View>
            <Text>What's your skin type?</Text>
            <Picker onValueChange={(value: string) => onChange(value)}>
                <Picker.Item label="oily" value="oily" />
                <Picker.Item label="dry" value="dry" />
                <Picker.Item label="combination" value="combination" />
                <Picker.Item label="normal" value="normal" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bottomButton: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  cameraMessage: {
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    color: "white",
  }
});
