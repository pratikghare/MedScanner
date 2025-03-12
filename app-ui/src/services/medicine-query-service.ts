import { gql } from "@apollo/client";
import { useClient } from "./graphql-service";


const GET_MEDICINES_BY_NAME = gql`
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


export function getMedicinesByName(name: string): Promise<any> {
    return useClient(GET_MEDICINES_BY_NAME, { name }).then((data) => data.getProductsByName);
}