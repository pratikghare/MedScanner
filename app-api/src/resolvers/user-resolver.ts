import users from "../../samples/users.json";
import fs from "fs";
import { resolve } from "path";

interface User {
    userId: string;
    emailId: string;
    name: string;
    initials: string;
    password: string;
    phone?: number;
    image?: string;
}

export const userResolver = {
    Query: {
        startServer: () => true,
        getUser: (_: any, { userId, password }: { userId: string, password: string } ) => 
            users.find((user) => password === user.password && (userId == user.userId || userId == user.emailId)),
        loggedInUser: (_:any, { token } : { token: string }) => users.find((user) => token == user.userId || user.emailId),
        isUserPresent: (_: any, { userId, field }: { userId: string, field?: "userId" | "emailId" } ) => {
            if(field) return users.find((user) => userId == user[field]) ? true : false;
            return users.find((user) => userId == user.userId || userId == user.emailId) ? true : false;
        },
        getAllUsers: () => users
    },
    Mutation: {
        addUser: (_:any, args: User) => {
            const user: User = { ...args };
            const updated = [...users, user];
            const path = resolve(__dirname, "../../samples/users.json");
            fs.writeFileSync(path, JSON.stringify(updated));
            return {
                id: args.emailId,
                response: "Registration Successfull"
            }
        }
    }
}