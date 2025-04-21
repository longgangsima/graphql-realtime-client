import { gql } from '@apollo/client';

export const USER_ADDED = gql`
  subscription OnUserAdded {
    userAdded {
      id
      name
    }
  }
`;
