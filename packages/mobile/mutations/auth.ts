import { gql } from "@apollo/client";

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
`;

const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      code
      error {
        message
        code
      }
      data {
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation Mutation($accessToken: String!) {
    refresh(accessToken: $accessToken) {
      success
      code
      error {
        message
        code
      }
      data {
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, REFRESH_TOKEN };
