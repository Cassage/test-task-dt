import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($user: [IUser]) {
    addUser(user: $user) @client
  }
`;

export const MODIFY_USER = gql`
  mutation modifyUser($user: [IUser]) {
    modifyUser(user: $user) @client
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($currentUserId: Int!) {
    deleteUser(id: $currentUserId) @client
  }
`;
