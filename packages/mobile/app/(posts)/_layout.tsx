import {FlatList, Text, View} from "react-native";
import {useQuery} from "@apollo/client";
import {FETCH_POSTS} from "@/queries/posts";
import React from "react";
import {PostItem} from "@/app/(posts)/components/PostItem";
import {POST} from "karmabridge-types/src";

interface Post {
    title: string;
}

export default function PostLayout() {
    const {data, loading, error} = useQuery(FETCH_POSTS)
    if (loading) return <Text>Loading...</Text>;
    if (error) return <View><Text>There is an error...</Text></View>;
    return <View>
        <PostItem posts={data.posts as POST[]} />
    </View>;
}