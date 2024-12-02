import { Controller } from "react-hook-form";
import { TextField } from "@/components/TextField";
import { Typography } from "@/constants/Typography";
import { View, Text } from "react-native";

export function NameField({ control, watch }: { control: any, watch: any }) {
    return (
        <View style={{ width: '100%', padding: 16, gap: 8 }}>
        <Text style={Typography.h3}>What's your first name?</Text>
            <Controller 
                control={control} 
                name="name"
                render={({ field: { onChange, value, onBlur } }) => (    
                <TextField
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder="Name"
                        value={value}
                />
            )} 
            />
        </View>
    )
}