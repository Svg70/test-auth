import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    register(email: $email, password: $password, username: $username)
  }
`

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        id, username, email
      }
    }
  }
`

export const CHANGE_PASS = gql`
  mutation($email: String!, $newPassword: String!, $repeatNewPassword: String!){
    resetPassword(email: $email, newPassword: $newPassword, repeatNewPassword: $repeatNewPassword)
  }
`
