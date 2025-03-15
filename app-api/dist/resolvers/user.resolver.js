"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const users_json_1 = __importDefault(require("../../samples/users.json"));
exports.userResolver = {
    Query: {
        getUser: (_, { userId, password }) => {
            return users_json_1.default.find((user) => password === user.password && (userId == user.userId || userId == user.emailId));
        },
        isUserPresent: (_, { userId }) => {
            return users_json_1.default.find((user) => userId == user.userId || userId == user.emailId) ? true : false;
        },
        getAllUsers: () => users_json_1.default
    }
};
