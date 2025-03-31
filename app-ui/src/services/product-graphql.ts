import { gql } from "@apollo/client";

export const GET_MEDICINES_BY_NAME = gql`
    query Query($name: String!) {
        getProductsByName(name: $name) {
            productId
            categoryId
            name
            price
            manufacturer
            images
            availability 
        }
    }
`;