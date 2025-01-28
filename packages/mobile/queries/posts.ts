import {gql} from "@apollo/client";

const FETCH_POSTS= gql`
    query Posts {
        posts {
            id
            title
            subtitle
            content
            published
        }
    }
`
export {
    FETCH_POSTS
}