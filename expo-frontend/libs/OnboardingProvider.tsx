import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type OnboardingState = {
    currentStep: number;
    images: File[];
    analysisResults: any;
    analysisIsLoading: boolean;
    isStepValid: boolean;
    analysisReady: boolean;
    buttonText?: string;
};

type OnboardingContextType = {
    state: OnboardingState;
    setState: React.Dispatch<React.SetStateAction<OnboardingState>>;
    handleBackButtonPress: () => void;
    TAKE_PHOTO_STEP_INDEX: number;
};

export const OnboardingContext = createContext<OnboardingContextType | undefined >(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<OnboardingState>({
        currentStep: 0,
        images: [],
        analysisResults: [],
        analysisIsLoading: true,
        isStepValid: false,
        analysisReady: false, //used for step 6: take photo after the user has successfully taken all pictures
        buttonText: 'Next'
    });


    const TAKE_PHOTO_STEP_INDEX : number = 6;

    useEffect(() => {
        console.log("Images updated:", state.images.length)
        setState(prev => ({ ...prev, analysisReady: prev.images.length === 3 }));
    }, [state.images]);

    useEffect(() => {
        console.log("Analysis Ready:", state.analysisReady);
    }, [state.analysisReady]);

    const handleBackButtonPress = () => {
        setState(prevState => ({ ...prevState, currentStep: prevState.currentStep - 1 }));
    };

    return (
        <OnboardingContext.Provider value={{ state, setState, handleBackButtonPress, TAKE_PHOTO_STEP_INDEX }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);

    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }

    return context;
};