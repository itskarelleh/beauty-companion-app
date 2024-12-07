import { useColorScheme } from "react-native";
import { Image } from "expo-image";

export function Logo({ width } : { width: number }) {
    const theme = useColorScheme()

    // const uri = 

    // if(theme === 'light') return  <Image source={require('@/assets/images/logo-dark.png')} 
    //     style={{ width: width, height: width }} />

    return (

        <>
        <Image source={(theme === 'dark') ? require('@/assets/images/logo-light.png') : require('@/assets/images/logo-dark.png')} 
        style={{ width: width, height: width }} />
        </>
    )
}