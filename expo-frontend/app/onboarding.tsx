import { OnboardingProvider } from "@/libs/OnboardingProvider";
import { Onboarding } from "@/components/onboarding";

export default function OnboardingPage() {

    return (
        <OnboardingProvider>
            <Onboarding />
        </OnboardingProvider>
    );
}