import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($currentUserId: Int!) {
    getUserById(id: $currentUserId) @client {
      firstName
      id
      lastName
      username
      workBorders
      roles
      password
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users
  }
`;
