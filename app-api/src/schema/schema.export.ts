import { loadFilesSync } from "@graphql-tools/load-files";
import { resolve } from "path";

// Load and merge schema files
export const typeDefs = loadFilesSync(resolve(__dirname, "./"), { extensions: ["graphql"] });