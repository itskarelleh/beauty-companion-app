import { StyleSheet, Text, TextProps } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { createThemedStyles } from '@/libs/styles'

export function StyledText(props: TextProps) {

    
    return (
        <Text style={styles.text} {...props}>
            {props.children}
        </Text>
    )
}

const styles = createThemedStyles((theme : typeof Colors.light | typeof Colors.dark ) => ({
    text: {
        color: theme.text
    }
}))