import users from "../../samples/users.json";

export const userResolver = {
    Query: {
        getUser: (_: any, { userId, password }: { userId: string, password: string } ) => {
            return users.find((user) => password === user.password && (userId == user.userId || userId == user.emailId))
        },
        isUserPresent: (_: any, { userId }: { userId: string } ) => {
            return users.find((user) => userId == user.userId || userId == user.emailId) ? true : false;
        },
        getAllUsers: () => users
    }
}