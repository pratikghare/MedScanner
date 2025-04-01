import { User } from "../models/user-context";
import { mutate, query } from "./graph-ql-service";
import { GEO_LOCATION, GET_USER, IS_EMAIL_ID_PRESENT, IS_USER_ID_PRESENT, IS_USER_PRESENT, LOGGED_IN_USER, POST_CODE_LOCATION, REGISTER_USER, START_SERVER } from "./user-graphql";

export const fetchLoggedInUser = (token: string): Promise<User> => {
    return query(LOGGED_IN_USER, { token }).then(data => data.loggedInUser);
}

export const loginUser = (userId: string, password: string): Promise<User> => {
    return query(GET_USER, { userId, password}).then(data => data.getUser);
}

export const checkUserExist = (userId: string): Promise<boolean> => {
    return query(IS_USER_PRESENT, { userId }).then(data => data.isUserPresent);
}

export const checkUserEmailExist = (email: string): Promise<boolean> => {
    return query(IS_EMAIL_ID_PRESENT, { userId: email }).then(data => data.isUserPresent);
}

export const checkUserIdExist = (userId: string): Promise<boolean> => {
    return query(IS_USER_ID_PRESENT, { userId }).then(data => data.isUserPresent);
}

export const logoutUser = (): Promise<any> => {
    return dummyPromise();
}

export const registerUser = (name: string, initials: string, emailId: string, userId: string, password: string): Promise<any> => {
    return mutate(REGISTER_USER, { name, userId, emailId, initials, password }).then((data: any) => data.addUser);
}

export const fetchLocationByGeoCode = (latitude: string, longitude: string) => {
    return query(GEO_LOCATION, { latitude, longitude }).then(data => data.getGeoCodeLocation);
}

export const fetchLocationByPostCode = (postCode: string) => {
    return query(POST_CODE_LOCATION, { postCode }).then(data => data.getLocationByPostCode);
}

// export const updateUser = (name: string, initials: string, email: string, userId: string, password: string, phone?: string): Promise<any> => {
//     return dummyPromise().then(() => true);
// }

export const startServer = (): Promise<boolean> => {
    return query(START_SERVER).then(() => true);
    // return dummyPromise();

}

function dummyPromise(): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Promise resolved successfully!");
        }, 5000);
    });
}