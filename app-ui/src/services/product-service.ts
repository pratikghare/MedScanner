import { query } from "./graph-ql-service";
import { GET_MEDICINES_BY_NAME } from "./product-graphql";

export function getMedicinesByName(name: string): Promise<any> {
    return query(GET_MEDICINES_BY_NAME, { name }).then((data) => data.getProductsByName);
}