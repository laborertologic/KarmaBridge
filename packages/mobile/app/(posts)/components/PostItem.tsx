import {StyleSheet, Text, View} from "react-native";
import {POST} from 'karmabridge-types/src'
import React from "react";

export function PostItem({posts}:{ posts:POST[]}) {

    return (
        <View
            style={styles.container}
        >
            {posts.map((post: POST) => {
                    return (<View>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.subtitle}>{post.subtitle}</Text>
                        <Text style={styles.subtitle}>{post.content}</Text>
                    </View>);
                }
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5
    },
    title:{
       fontSize: 18,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "semibold",
        color: "grey",
    }
})
