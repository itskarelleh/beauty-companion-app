import { Typography } from "@/constants/Typography";

import { View, Text } from "react-native";
import { TextField } from "../TextField";
import { Controller } from "react-hook-form";

export function AgeField({ control, watch }: { control: any, watch: any }) {
    return (
        <View style={{ width: '100%', padding: 16, gap: 8 }}>
        <Text style={Typography.h3}>Nice to meet you, {watch('name')}! What's your age?</Text>
        <Controller 
            control={control} 
            name="age"
            render={({ field: { onChange, value, onBlur } }) => (    
                <TextField
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Age"
                    value={value}
                        keyboardType="numeric"
                    />  
                )} 
            />
    </View>
    )
}