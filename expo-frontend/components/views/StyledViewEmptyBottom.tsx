import { Colors } from "@/constants/Colors";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Typography } from "@/constants/Typography";

export default function StyledViewEmptyBottom({ children, bottomButtonChildren }: { children: React.ReactNode, bottomButtonChildren?: React.ReactNode }) {

  return (
    <View style={styles.container}>
      {children}
      <SafeAreaView style={styles.bottomButtonContainer}>
        {bottomButtonChildren}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: 16
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 16
  },
  disabledButton: {
    backgroundColor: Colors.light.button.disabledBackground
  }
});