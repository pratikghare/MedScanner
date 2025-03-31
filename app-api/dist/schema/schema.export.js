"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const path_1 = require("path");
// Load and merge schema files
const loadedTypeDefs = (0, load_files_1.loadFilesSync)((0, path_1.resolve)(__dirname, "./"), { extensions: ["graphql"] });
exports.typeDefs = (0, merge_1.mergeTypeDefs)(loadedTypeDefs);
