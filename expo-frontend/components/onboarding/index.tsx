import { View, Text, TouchableOpacity, Image, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Controller } from "react-hook-form";
import { Onboarding } from "./Onboarding";
import React, { useState } from 'react';
import { Typography } from "@/constants/Typography";
import { AgeField } from "./AgeField";
import { NameField } from "./NameField";
import { TakePhoto } from "./TakePhoto";
import { SkinColorSelection } from "./SkinColorSelection";
import { SkinTypeSelection } from "./SkinTypeSelection";


const onboardingStyles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
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
      backgroundColor: theme?.button?.background,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    swatch: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        margin: 10,
        borderRadius: 4,
    },
    selectedSwatch: {
        borderWidth: 2,
        borderColor: Colors.light.border.selected,
    },
  });

  export { AgeField, NameField, TakePhoto, SkinColorSelection, SkinTypeSelection, onboardingStyles, Onboarding };