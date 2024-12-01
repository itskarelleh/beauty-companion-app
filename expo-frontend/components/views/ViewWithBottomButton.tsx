import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Typography } from "@/constants/Typography";
export default function ViewWithBottomButton({ children, onNext, buttonHidden }: { children: React.ReactNode, onNext: () => void, buttonHidden?: boolean }) {

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.bottomButtonContainer}>
        {!buttonHidden && <TouchableOpacity style={styles.bottomButton} onPress={onNext}>
          <Text style={styles.bottomButtonText}>Next</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: Colors.light.button.background,
    padding: 10,
    borderRadius: 25,
  },
  bottomButtonText: {
    color: Colors.light.button.text,
    textAlign: "center",
    fontSize: Typography.button.fontSize,
    fontWeight: 700,
  },
});
