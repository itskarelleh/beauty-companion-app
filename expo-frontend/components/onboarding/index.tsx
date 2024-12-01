import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const ColorSelection = ({ onChange }: { onChange: (value: string) => void }) => {
    return (
        <View>
            <Text>What's your skin tone?</Text>
            <Picker onValueChange={(value: string) => onChange(value)}>
                <Picker.Item label="light" value="light" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="dark" value="dark" />
            </Picker>
        </View>
    )
}

export const SkinTypeSelection = ({ onChange }: { onChange: (value: string) => void }) => {
    return (
        <View>
            <Text>What's your skin type?</Text>
            <Picker onValueChange={(value: string) => onChange(value)}>
                <Picker.Item label="oily" value="oily" />
                <Picker.Item label="dry" value="dry" />
                <Picker.Item label="combination" value="combination" />
                <Picker.Item label="normal" value="normal" />
            </Picker>
        </View>
    )
}

export const styles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
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
    }
  });
  