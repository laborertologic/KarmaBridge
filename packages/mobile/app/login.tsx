import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/mutations/auth";
import CheckBox from "expo-checkbox";
import { AuthInfo, RESPONSE } from "ktypes";
import { useForm, Control, FieldValue, FieldValues, Controller } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginScreen() {
  const [input, setInput] = useState<Inputs>({
    email: "",
    password: "",
    remember: false,
  });
  const [loginUser] = useMutation(LOGIN_USER, { ignoreResults: true });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: input,
  });

  const handleLogin = async () => {
    setLoading(true);
    setMessage("collecting account information...");
    const { data } = await loginUser({
      variables: {
        email: input.email,
        password: input.password,
      },
    });
    const result: RESPONSE<AuthInfo> = data.login;
    if (result && result.success && result.code === 200) {
      setLoading(false);
    } else {
      setLoading(true);
      setMessage(result.error!.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="you@domain.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ borderRadius: 5, borderBottomColor: "red" }}
          />
        )}
        name="email"
      />
      <View style={styles.errors}>{errors.email && <Text>Email is required.</Text>}</View>

      <Text>Password</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="secret" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry style={styles.inputs} />
        )}
        name="password"
      />
      <View style={styles.errors}>{errors.email && <Text>Please enter your password.</Text>}</View>
      <View style={styles.section}>
        <CheckBox
          style={styles.checkbox}
          value={input.remember}
          onValueChange={(e) =>
            setInput((prevState) => ({
              email: prevState.email,
              password: prevState.password,
              remember: !prevState.remember,
            }))
          }
          id={"checkBox"}
        />
        <Text style={styles.paragraph}>Remember me</Text>
      </View>
      <Button title={"Login"} onPress={handleSubmit(handleLogin)} />
      <Text style={{ ...styles.errors, display: loading ? "flex" : "none" }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    wordWrap: "wrap",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 14,
  },
  checkbox: {
    margin: 8,
  },
  errors: {
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 16,
    color: "red",
  },
  inputs: {
    padding: 20,
    margin: 7,
  },
});
