import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <Text>
        </Text>
      </View>
      <Link href={"/(posts)"}>Posts</Link>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
      <Link href={"/(jobs)"}>Jobs</Link>
      <Link href={"/details"}>Details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});