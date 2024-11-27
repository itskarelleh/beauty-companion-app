import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function Home() {

    const router = useRouter();
    return <View style={styles.container}>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => {
                router.push('/advisor')
            }} style={styles.button}>
                <Text>Advisor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                router.push('/analysis')
            }} style={styles.button}>
                <Text>Analysis</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <Text>No results yet</Text>
        </View>

    </View>
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    button: {
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        width: '50%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        width: '100%'
    }
})