import { ApolloClient, DocumentNode, InMemoryCache } from "@apollo/client";
import { env } from "../env/env";

const client = new ApolloClient({
    uri: env.apiUrl,
    cache: new InMemoryCache(),
});

export const useClient = (query: DocumentNode, variables?: Record<string, any>): Promise<any> => 
    client
    .query({query, variables})
    .then((response) => response.data) // Resolve with location data
    .catch((error) => {
        console.error("Error fetching data:", error);
        throw error; // Reject with error
    });