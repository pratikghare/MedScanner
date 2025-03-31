"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const users_json_1 = __importDefault(require("../../samples/users.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
exports.userResolver = {
    Query: {
        startServer: () => true,
        getUser: (_, { userId, password }) => users_json_1.default.find((user) => password === user.password && (userId == user.userId || userId == user.emailId)),
        loggedInUser: (_, { token }) => users_json_1.default.find((user) => token == user.userId || user.emailId),
        isUserPresent: (_, { userId, field }) => {
            if (field)
                return users_json_1.default.find((user) => userId == user[field]) ? true : false;
            return users_json_1.default.find((user) => userId == user.userId || userId == user.emailId) ? true : false;
        },
        getAllUsers: () => users_json_1.default
    },
    Mutation: {
        addUser: (_, args) => {
            const user = Object.assign({}, args);
            const updated = [...users_json_1.default, user];
            const path = (0, path_1.resolve)(__dirname, "../../samples/users.json");
            fs_1.default.writeFileSync(path, JSON.stringify(updated));
            return {
                id: args.emailId,
                response: "Registration Successfull"
            };
        }
    }
};
