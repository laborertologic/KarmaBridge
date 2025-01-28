import {Link} from 'expo-router';
import React from 'react';
import {View, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <View style={styles.container}>
                <Link href="/">Go Home</Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});