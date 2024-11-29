import { router } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';

export default function PermissionsPage() {
    const { hasPermission, requestPermission } = useCameraPermission();

    const handleRequestPermission = async () => {
        const permission = await requestPermission();
        if (permission) {
            // Handle the case where permission is granted
            router.push('/home')
        } else {
            // Handle the case where permission is denied
            router.push('/home')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Camera permission is required to use this feature.
            </Text>
            {!hasPermission && (
                <Button
                    title="Grant Permission"
                    onPress={handleRequestPermission}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});