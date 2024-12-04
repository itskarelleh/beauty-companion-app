import React, { createContext, useContext, useState, ReactNode } from 'react';

type OnboardingState = {
    currentStep: number;
    images: any[];
    analysisResults: any;
    analysisIsLoading: boolean;
    isStepValid: boolean;
};

type OnboardingContextType = {
    state: OnboardingState;
    setState: React.Dispatch<React.SetStateAction<OnboardingState>>;
    handleBackButtonPress: () => void;
};

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<OnboardingState>({
        currentStep: 0,
        images: [],
        analysisResults: [],
        analysisIsLoading: false,
        isStepValid: false
    });

    const handleBackButtonPress = () => {
        setState(prevState => ({ ...prevState, currentStep: prevState.currentStep - 1 }));
    };

    return (
        <OnboardingContext.Provider value={{ state, setState, handleBackButtonPress }}>
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