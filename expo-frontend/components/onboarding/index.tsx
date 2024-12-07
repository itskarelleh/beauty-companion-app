import { Colors } from "@/constants/Colors";
import { Onboarding } from "./Onboarding";
import { Typography } from "@/constants/Typography";
import { AgeField } from "./AgeField";
import { NameField } from "./NameField";
import { TakePhoto } from "./TakePhoto";
import { SkinColorSelection } from "./SkinColorSelection";
import { SkinTypeSelection } from "./SkinTypeSelection";
import { SkinAnalysisPrep } from "./SkinAnalysisPrep";
import { OnboardingIntro } from "./OnboardingIntro";
import { createThemedStyles } from "@/libs/styles";

const onboardingStyles = createThemedStyles((theme: typeof Colors.light | typeof Colors.dark) => ({
    container: {
      flex: 1
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
      backgroundColor: theme.button?.background,
    },
    cameraMessage: {
      paddingBottom: 10,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      color: theme?.button?.text,
    },
    label: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    swatchContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    swatch: {
        width: 45, // Adjust size as needed
        height: 45, // Adjust size as needed
        margin: 10,
        borderRadius: 4,
    },
    selectedSwatch: {
        borderWidth: 2,
        borderColor: (theme).border.selected,
    },
  }));

  export {
    OnboardingIntro,
    AgeField, 
    NameField, 
    TakePhoto, 
    SkinColorSelection, 
    SkinTypeSelection, 
    SkinAnalysisPrep,
    onboardingStyles, 
    Onboarding };