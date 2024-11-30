import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ViewWithBottomButton({ children, onNext, buttonHidden }: { children: React.ReactNode, onNext: () => void, buttonHidden?: boolean }) {
  const [step, setStep] = useState(0);

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.bottomButtonContainer}>
        {!buttonHidden && <TouchableOpacity style={styles.bottomButton} onPress={onNext}>
          <Text>Next</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
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
    padding: 10,
    borderRadius: 25,
  },
});
