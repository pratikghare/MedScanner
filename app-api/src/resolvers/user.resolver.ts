import users from "../../samples/users.json";

export const userResolver = {
    Query: {
        getUser: (_: any, { userId, password, emailId }: { userId: string, password: string, emailId: string } ) => {
            if(userId?.length || emailId?.length) {
                return users.find((user) => password === user.password && (userId == user.userId || emailId == user.emailId))
            }
            return null;
        },
        getAllUsers: () => users
    }
}