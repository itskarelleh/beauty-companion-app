import { Button, View, Text, StyleSheet, useColorScheme } from "react-native"
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { TextField } from "@/components/TextField";
import { Controller } from "react-hook-form";

export default function LoginForm() {
    const themeColorScheme = useColorScheme() === 'light' ? Colors.light : Colors.dark;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailPasswordValid, setIsEmailPasswordValid] = useState(false);

    const handleSignUp = () => {
        console.log(email, password, confirmPassword);
    }

    return (
        <View>
            <Text>Sign Up</Text>

            <Button title="Email" onPress={handleSignUp} />

            <View>
                or
            </View>

            <View style={styles(themeColorScheme).socialButtons}>
                <Button title="Google" onPress={handleSignUp} />
                <Button title="Apple" onPress={handleSignUp} />
                <Button title="Facebook" onPress={handleSignUp} />
            </View>
        </View>
    )
}

const EmailPasswordForm = ({ setEmail, setPassword }: { setEmail: (text: string) => void, setPassword: (text: string) => void }) => {

    return (
        <View>
            <Controller render={({field : { onChange, value, onBlur } }) => (
                <TextField
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Email"
                    defaultValue={value}
                />
            )} name="email" />
            <Controller render={({field : { onChange, value, onBlur } }) => (
                <TextField
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Password"
                    defaultValue={value}
                />
            )} name="password" />
        </View>
    )
}

const styles = (theme: typeof Colors.light | typeof Colors.dark) => StyleSheet.create({
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8
    }
})