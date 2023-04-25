import { gql } from "@apollo/client";
 
export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      images {
        path
      }
      attributes {
        integer_value
        text_value
        boolean_value
        value
        configurable
        attribute {
          admin_name
          code
        }
      }
    }
  }
`;
