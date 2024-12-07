import { Controller } from "react-hook-form";
import { TextField } from "@/components/TextField";
import { Typography } from "@/constants/Typography";
import { StyledText as Text } from '@/components/common/StyledText'
import { StepContainer } from "./StepContainer";

export function NameField({ control, watch }: { control: any, watch: any }) {
    
    return (
        <StepContainer heading="What's your name?">
            <Text style={Typography.body}>Your first name or a nickname is just fine</Text>
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
        </StepContainer>
    )
}