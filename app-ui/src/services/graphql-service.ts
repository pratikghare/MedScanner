import { ApolloClient, DocumentNode, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
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