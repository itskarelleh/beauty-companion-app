import { TextField } from "@/components/TextField"
import ViewWithBottomButton from "@/components/views/ViewWithBottomButton";
import { useState } from "react";
import { View , StyleSheet, Text} from "react-native"
import { Typography } from "@/constants/Typography";
import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";

export default function LoginEmail() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        console.log('Login');

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
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

    return (
        <ViewWithBottomButton buttonDisabled={email === '' || password === ''} 
        onNext={async() => await handleLogin} 
        buttonText="Login">  
            <View style={styles.parentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.container}>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <TextField placeholder="Email" onChangeText={(text) => setEmail(text)} />
                    <TextField type="password" placeholder="Password" onChangeText={(text) => setPassword(text)} />
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
    }
})  