import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Typography } from "@/constants/Typography";
import { StepContainer } from "./StepContainer";


export function SkinAnalysisPrep() {

    return (
        <StepContainer heading="Get Ready for Your First Skin Analysis!">
            <Text style={[Typography.body, {marginTop: 24, width: '100%'}]}>
                Now that we know a bit about you, let's get started with a personalized skincare routine! Let's start with a skin analysis.
            </Text>
            <Text style={[Typography.body, { marginTop: 48, marginBottom: 24}]}>
                For the best results pull your hair out of your face and sit in front of a neutral background with light shining on your face.
            </Text>

            <View style={{flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 264, height: 264, alignSelf:'center'}}>
                    <Image style={{width: '100%', height: '100%'}} 
                    source={require('@/assets/images/skin-analysis-example.jpg')} 
                    alt="Woman with headband and two high buns in her hair." />
                </View>
            </View>
        </StepContainer>
          
        // </View>
    )
}