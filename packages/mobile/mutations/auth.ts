import {gql} from "@apollo/client";

const REGISTER_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            success
            code
            error {
                message
                code
            }
            data {
                firstName
                middleName
                lastName
                email
                verified
                id
            }
        }
    }
`
export {
    REGISTER_USER
}
