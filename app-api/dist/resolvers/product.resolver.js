"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResolver = void 0;
const products_json_1 = __importDefault(require("../../samples/products.json"));
exports.productResolver = {
    Query: {
        getProductById: (_, { productId }) => products_json_1.default.find((product) => product.productId == productId),
        getAllProducts: () => products_json_1.default,
        getProductsByName: (_, { name }) => products_json_1.default.filter((product) => String(product.name).toLocaleLowerCase().includes(String(name).toLocaleLowerCase())),
    },
};
