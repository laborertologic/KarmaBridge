import {View, Text, StyleSheet, Button, TextInput, GestureResponderEvent} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState} from "react";
import {REGISTER_USER} from "@/mutations/auth";
import {useMutation} from "@apollo/client";

interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export default function RegisterScreen() {
    const [input, setInput] = useState<Inputs>({email: "", password: "", firstName: "", lastName: "",confirmPassword: ""});
    const [addUser, {data}] = useMutation(REGISTER_USER);

    const handleRegister = async (e: GestureResponderEvent) => {
        e.preventDefault();
        const data = await addUser({variables: {email: input.email, password: input.password}});
       console.log(data);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Your Account Information
            </Text>
            <View>
                <TextInput placeholder={"First Name"}

                           onChangeText={e => setInput({
                               firstName: e,
                               lastName: input.lastName,
                               email: input.email,
                               password: input.password,
                               confirmPassword: input.confirmPassword,
                           })}
                           tabIndex={0}
                />
                <TextInput placeholder={"Last Name"}
                           onChangeText={e => setInput({
                               firstName: input.firstName,
                               lastName: e,
                               email: input.email,
                               password: input.password,
                               confirmPassword: input.confirmPassword,
                           })}
                           value={input.lastName}
                           tabIndex={0}
                />
                <TextInput placeholder={"Email"}
                           onChangeText={e => setInput(prevState => ({
                               lastName: prevState.lastName,
                               firstName: prevState.firstName,
                               email: e,
                               password: prevState.password,
                               confirmPassword: prevState.confirmPassword,
                           }))}
                           value={input.email} textContentType={"password"}/>
                <TextInput placeholder={"Password"}
                           secureTextEntry
                           onChangeText={e => setInput(prevState => ({
                               lastName: prevState.lastName,
                               firstName: prevState.firstName,
                               email: prevState.email,
                               password: e,
                               confirmPassword: prevState.confirmPassword,
                           }))}
                           value={input.password} textContentType={"password"}/>
                <TextInput placeholder={"Confirm Password"}
                           secureTextEntry
                           onChangeText={e => setInput(prevState => ({
                               lastName: prevState.lastName,
                               firstName: prevState.firstName,
                               email: prevState.email,
                               password: prevState.password,
                               confirmPassword: e,
                           }))}
                           value={input.password} textContentType={"password"}/>
                <Button title={"Create Your Account"} color={Colors.dark.background} onPress={handleRegister}/>
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