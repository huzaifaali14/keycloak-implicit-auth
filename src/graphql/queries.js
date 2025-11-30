import { gql } from '@apollo/client';

// Query to get all users
export const GET_ALL_USERS = gql`
  query GetAllUsers($filter: UserFilter, $limit: Int, $offset: Int) {
    getAllUsers(filter: $filter, limit: $limit, offset: $offset) {
      id
      name
      email
      posts {
        id
        name
      }
    }
  }
`;

// Query to get a single user
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      postalCode
      postIds
    }
  }
`;

