"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("@graphql-tools/schema");
const resolvers_export_1 = require("./resolvers/resolvers.export");
const schema_export_1 = require("./schema/schema.export");
const env_1 = __importDefault(require("./env/env"));
// Create schema
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_export_1.typeDefs, resolvers: resolvers_export_1.resolvers });
// Start Apollo Server
const server = new apollo_server_1.ApolloServer({ schema, cors: { origin: "*", credentials: true } });
server.listen({ port: env_1.default.PORT, host: "0.0.0.0" }).then(({ url }) => {
    console.log(`🚀 Server running on ${url}`);
});
