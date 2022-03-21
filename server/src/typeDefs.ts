import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    notes: [Note]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  enum Sort {
    asc
    desc
  }

  type Note {
    id: ID!
    title: String!
    userId: String!
    createdAt: Date
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
    getAllNotes:[Note]
    getUserNotes(id: ID): [Note]
  }

  type Mutation {
    register(email: String!, password: String!, username: String!): Boolean!
    login(email: String!, password: String!): AuthPayload
    resetPassword(email: String!, newPassword: String!, repeatNewPassword: String!): Boolean!
    createNote(title: String!): Note!
  }
`;