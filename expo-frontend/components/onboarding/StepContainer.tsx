import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '@/constants/Typography'
import { StyledText as Text } from '@/components/common/StyledText'
import { useOnboarding } from '@/libs/OnboardingProvider'

//Container that has content for each step of the onboarding flow
export function StepContainer({ heading, children }: { heading: string | undefined, children: React.ReactNode}) {
    
    const { state, TAKE_PHOTO_STEP_INDEX } = useOnboarding();
    
    return (
        <View style={styles().stepContainer}>
            {heading && <Text style={[Typography.h2, 
                styles(state.currentStep, 
                TAKE_PHOTO_STEP_INDEX).heading]}>{heading}</Text>}
            {children}
        </View>
    )
}

const styles = (current? : any, target?: any) => StyleSheet.create({
    stepContainer: {
        width: '100%', 
        paddingHorizontal: 16, 
        gap: 8 
    },
    heading: {
        height:  current === target ? 130 : 'auto'
    }
})