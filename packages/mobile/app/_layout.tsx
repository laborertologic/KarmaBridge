import {Stack} from "expo-router";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {StyleSheet} from "react-native";
import {Words} from "@/constants/Words";

export const client = new ApolloClient({
    uri: 'http://10.0.2.2:4000/',
    cache: new InMemoryCache(),
    name: 'graph-client',
    version: '1.3',
    queryDeduplication: false,
    defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network',},}
});

export default function RootLayout() {
    return (
        <ApolloProvider client={client}>
            <Stack
                screenOptions={{
                    title: Words.info.title,
                    headerStyle: {
                        backgroundColor: '#1b2526',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen name="(posts)" options={{title: 'Posts'}}/>
                <Stack.Screen name="(jobs)" options={{title: 'Jobs'}}/>
                <Stack.Screen name="details" options={{title: 'Details'}}/>
                <Stack.Screen name="register" options={{title: 'Registration'}}/>
            </Stack>;
        </ApolloProvider>);
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        // height: 50,
    },
});