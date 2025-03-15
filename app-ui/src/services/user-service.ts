import { gql } from "@apollo/client";
import { useClient } from "./graphql-service";


const IS_USER_PRESENT = gql`
    query Query($userId: String!) {
        isUserPresent(userId: $userId) 
    }
`;

const GET_USER = gql`
query Query($userId: String!, $password: String!) {
  getUser(userId: $userId, password: $password) {
    name
    userId
    emailId
    password
    image
    initials
    phone
  }
}
`;

const GET_USER_LOGIN = gql`
query Query($userId: String!, $password: String!) {
  getUser(userId: $userId, password: $password) {
    name
    userId
    emailId
    image
    initials
    phone
  }
}
`;

export function isUserPresent(userId: string): Promise<any> {
    return useClient(IS_USER_PRESENT, { userId }).then((data) => data.isUserPresent);
}

export function getUser(userId: string, password: string): Promise<any> {
    GET_USER
    return useClient(GET_USER_LOGIN, { userId, password }).then((data) => data.getUser);
}