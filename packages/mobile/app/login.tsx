import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useState} from "react";

interface Inputs {
    email: string;
    password: string;
}

export default function LoginScreen() {
    const [input, setInput] = useState<Inputs>({email: "", password: ""});
    return (
        <View style={styles.container}>
            <Text>
                Login Page
            </Text>
            <View>
                <TextInput placeholder={"Your email address"} onChangeText={e => setInput({email: e, password: ""})}
                           value={input.email}/>
                <TextInput placeholder={"Password"}
                           onChangeText={e => setInput(prevState => ({email: prevState.email, password: e}))}
                           value={input.password}/>
                <Button title={"Login"}/>
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