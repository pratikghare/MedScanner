"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const users_json_1 = __importDefault(require("../../samples/users.json"));
exports.userResolver = {
    Query: {
        getUser: (_, { userId, password, emailId }) => {
            if ((userId === null || userId === void 0 ? void 0 : userId.length) || (emailId === null || emailId === void 0 ? void 0 : emailId.length)) {
                return users_json_1.default.find((user) => password === user.password && (userId == user.userId || emailId == user.emailId));
            }
            return null;
        },
        getAllUsers: () => users_json_1.default
    }
};
