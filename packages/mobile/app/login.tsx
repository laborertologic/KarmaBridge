import { View, Text, StyleSheet, Button, TextInput, GestureResponderEvent } from "react-native";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { FetchResult, useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/mutations/auth";
import CheckBox from "expo-checkbox";
import { AuthInfo, RESPONSE } from "ktypes";

interface Inputs {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginScreen() {
  const [input, setInput] = useState<Inputs>({
    email: "",
    password: "",
    remember: false
  });
  const [loginUser] = useMutation(LOGIN_USER, { ignoreResults: true });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("collecting account information...");

    const { data } = await loginUser({
      variables: {
        email: input.email,
        password: input.password
      }
    });
    const result: RESPONSE<AuthInfo> = data.login;
    if (result && result.success && result.code === 200) {
      console.log(data);
      setLoading(false);
    } else {
      setLoading(true);
      setMessage(result.error!.message);
      console.log("error: ", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TextInput placeholder={"Your email address"} onChangeText={e => setInput({
          email: e, password: "",
          remember: false
        })}
                   value={input.email} />
        <TextInput placeholder={"Password"}
                   onChangeText={e => setInput(prevState => ({ email: prevState.email, password: e, remember: false }))}
                   value={input.password}
                   textContentType={"password"}
                   secureTextEntry
        />
        <View style={styles.section}>
          <CheckBox style={styles.checkbox} value={input.remember} onValueChange={e => setInput(prevState => ({
            email: prevState.email,
            password: prevState.password,
            remember: !prevState.remember
          }))} id={"checkBox"} />
          <Text style={styles.paragraph}>Remember me</Text>
        </View>
        <Button title={"Login"} onPress={handleLogin} />
        <Text style={{ ...styles.errors, display: loading ? "flex" : "none" }}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    wordWrap: "wrap"
  },
  buttonContainer: {
    paddingVertical: 5
  },
  text: {
    paddingVertical: 8,
    color: Colors.dark.background,
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    flexDirection: "row",
    alignItems: "center"
  },
  paragraph: {
    fontSize: 14
  },
  checkbox: {
    margin: 8
  },
  errors: {
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 16,
    color: "red"
  }
});