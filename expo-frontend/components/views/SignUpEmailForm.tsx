import { TextField } from "@/components/TextField"
import ViewWithBottomButton from "@/components/views/ViewWithBottomButton";
import { useState } from "react";
import { View , StyleSheet, Text} from "react-native"
import { Typography } from "@/constants/Typography";
import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

interface SignUpFormProps {
    email: string;
    password: string;
}

export default function SignupEmailForm({ onSubmit, newUser }: { onSubmit: any, newUser: any }) {

    const { control, handleSubmit, watch } = useForm<SignUpFormProps>();
    const [ error, setError ] = useState('');
    const router = useRouter();
    const [validationMessages, setValidationMessages] = useState<string[]>([]);

    const handleOnboarding = async () => {
        console.log('Onboarding');

        //save user to supabase
        const { data, error } = await supabase.auth.signUp({
            email: newUser.email,
            password: newUser.password
        });

        //save user profile to supabase
        if(data) {
            console.log(data);

            await supabase.from('user_profiles').insert({
                user_id: data.user?.id,
                name: newUser.name
            });

            await supabase.from('user_skin_analysis').insert({
                user_id: data.user?.id,
                content: newUser.analysis
            });
        }

        //save user skin analysis to supabase

        //redirect to home
        router.push('/home');
    }

    const handleLogin = async () => {
        console.log('Login');

        const { data, error } = await supabase.auth.signInWithPassword({
            email: watch('email') as string,
            password: watch('password') as string
        });

        if(data) {
            console.log(data);
            router.push('/home');
        }

        if (error) {
            console.log(error);
            setError(error.message);
        }
    }

    const validateForm = () => {
        const messages = [];
        const email = watch('email');
        const password = watch('password');

        if (!email.includes('@')) {
            messages.push('Email must be valid.');
        }
        if (password.length < 8) {
            messages.push('Password must be at least 8 characters long.');
        }
        // Add more validation rules as needed

        setValidationMessages(messages);
    };

    return (
        <ViewWithBottomButton 
            buttonDisabled={watch('email') === '' || watch('password') === ''} 
            onNext={async() => {
                validateForm();
                if (validationMessages.length === 0) {
                    await handleLogin();
                }
            }} 
            buttonText="Login"
        >  
            <View style={styles.parentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>
                <View style={styles.container}>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <Controller control={control} name="email" render={({ field }) => ( 
                        <TextField placeholder="Email" {...field} />
                    )} />
                    <Controller control={control} name="password" render={({ field }) => (
                        <TextField type="password" placeholder="Password" {...field} />
                    )} />
                </View>
                <View style={styles.validationContainer}>
                    {validationMessages.map((message, index) => (
                        <Text key={index} style={styles.error}>{message}</Text>
                    ))}
                </View>
            </View>
        </ViewWithBottomButton>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        width: '100%',
        gap: 16,
        paddingTop: 24
    },
    title: {
        fontSize: Typography.h1.fontSize,
        fontWeight: Typography.h1.fontWeight,
        textAlign: 'center',
    },
    titleContainer: {
        width: '100%',
        padding: 16
    },
    container: {
        width: '100%',
        gap: 16
    },
    error: {
        color: 'red',
        textAlign: 'center'
    },
    validationContainer: {
        width: '100%',
        gap: 16
    }
})  