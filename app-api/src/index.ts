import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers/resolvers.export";
import { typeDefs } from "./schema/schema.export";

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Start Apollo Server
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Server running on ${url}`);
});
