import {View, Text, StyleSheet, Button} from 'react-native';
import {Colors} from "@/constants/Colors";
import {Words} from "@/constants/Words";
import {Link} from "expo-router";

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text>
                {Words.bio}
            </Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>(https://karmabridge.com.au/motivation-about)</Text>
                <Link href={"https://karmabridge.com.au/motivation-about"}/>
                <View style={styles.links}>
                    <Button title={"Learn More"}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        wordWrap: 'wrap',
    },
    buttonContainer: {
        paddingVertical: 5,
    },
    text: {
        paddingVertical: 8,
        color: Colors.dark.background,
        fontWeight: "bold",
    },
    links: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});