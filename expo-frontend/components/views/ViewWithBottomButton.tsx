import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Typography } from "@/constants/Typography";
export default function ViewWithBottomButton({ children, onNext, buttonHidden, buttonDisabled, buttonText }: { children: React.ReactNode, onNext: () => void, buttonHidden?: boolean, buttonDisabled  ?: boolean, buttonText?: string }) {

  return (
    <View style={styles.container}>
      {children}
      <SafeAreaView style={styles.bottomButtonContainer}>
        {!buttonHidden && <TouchableOpacity style={[styles.bottomButton, buttonDisabled && styles.disabledButton]} onPress={onNext} disabled={buttonDisabled}>
          <Text style={styles.bottomButtonText}>{buttonText || 'Next'}</Text>
        </TouchableOpacity>}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    padding: 24,
    paddingTop: 64
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 16
  },
  bottomButton: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.light.button.background,
    padding: 10,
    borderRadius: 10,
  },
  bottomButtonText: {
    color: Colors.light.button.text,
    textAlign: "center",
    fontSize: Typography.button.fontSize,
    fontWeight: 700,
  },
  disabledButton: {
    backgroundColor: Colors.light.button.disabledBackground
  }
});