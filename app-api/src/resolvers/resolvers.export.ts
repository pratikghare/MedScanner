import { mergeResolvers } from "@graphql-tools/merge";
import { productResolver } from "./product-resolver";
import { userResolver } from "./user-resolver";
import { locationResolver } from "./location-resolver";

// Merge all resolvers
export const resolvers = mergeResolvers([productResolver, userResolver, locationResolver]);