import { gql } from "@apollo/client"

export const СREATE_POST = gql`
  mutation($title: String!) {
    createNote(title: $title) {
      id, title
    }
  }
`

export const GET_POSTS = gql`
  query($getUserNotesId: ID){
    getUserNotes(id: $getUserNotesId) {
      id, title, userId, createdAt
    }
  }
`
