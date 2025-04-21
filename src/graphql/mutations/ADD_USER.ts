import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;
