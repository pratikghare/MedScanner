import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { resolve } from "path";

// Load and merge schema files
const loadedTypeDefs = loadFilesSync(resolve(__dirname, "./"), { extensions: ["graphql"] });
export const typeDefs = mergeTypeDefs(loadedTypeDefs);