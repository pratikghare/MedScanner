import { gql } from "@apollo/client";

export const IS_USER_PRESENT = gql`
    query Query($userId: String!) {
        isUserPresent(userId: $userId) 
    }
`;

export const IS_USER_ID_PRESENT = gql`
    query Query($userId: String!) {
        isUserPresent(userId: $userId, field: "userId") 
    }
`;

export const IS_EMAIL_ID_PRESENT = gql`
    query Query($userId: String!) {
        isUserPresent(userId: $userId, field: "emailId") 
    }
`;

export const GET_USER = gql`
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

export const LOGGED_IN_USER = gql`
    query Query($token: String!) {
        loggedInUser(token: $token) {
            name
            userId
            image
            initials
        }
    }
`;

export const REGISTER_USER = gql`
    mutation Mutation($name: String!, $emailId: String!, $password: String!, $userId: String!, $initials: String!) {
        addUser(name: $name, userId: $userId, emailId: $emailId, password: $password, initials: $initials) {
            id
            response
        }
    }
`;

export const START_SERVER = gql`
    query Query {
        startServer
    }
`;

export const GEO_LOCATION = gql`
    query Query($latitude: String!, $longitude: String!) {
        getGeoCodeLocation(latitude: $latitude, longitude: $longitude) {
            state
            postCode
            county
            countryCode
            city
            country
        }
    }
`;

export const POST_CODE_LOCATION = gql`
    query GetLocationByPostCode($postCode: String!) {
        getLocationByPostCode(postCode: $postCode) {
            state
            postCode
            county
            countryCode
            country
            city
        }
    }
`;
