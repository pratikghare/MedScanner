import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers/resolvers.export";
import { typeDefs } from "./schema/schema.export";

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Start Apollo Server
const server = new ApolloServer({ schema, cors: { origin: "*", credentials: true } });

server.listen({ port: 4000, host: "0.0.0.0" }).then(({ url }) => {
  console.log(`🚀 Server running on ${url}`);
});
