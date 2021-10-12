import { gql } from "@apollo/client"

export const GET_DETAILS = gql`
  query getDetails($id: ID!) {
    good(id: $id) {
      types {
        qty
      }
    }
  }
`;