"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const product_resolver_1 = require("./product-resolver");
const user_resolver_1 = require("./user-resolver");
const location_resolver_1 = require("./location-resolver");
// Merge all resolvers
exports.resolvers = (0, merge_1.mergeResolvers)([product_resolver_1.productResolver, user_resolver_1.userResolver, location_resolver_1.locationResolver]);
