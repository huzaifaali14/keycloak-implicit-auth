import { gql } from '@apollo/client';

// Mutation to create a user
export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
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

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      postalCode
      postIds
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

