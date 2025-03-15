import { gql } from "@apollo/client";
import { useClient } from "./graphql-service";
import { AddressLocation } from "../models/user-model";

const GET_GEO_LOCATION = gql`
    query GetGeoCodeLocation($latitude: String!, $longitude: String!) {
        getGeoCodeLocation(latitude: $latitude, longitude: $longitude) {
            city
            state
            county
            postCode
            countryCode
            country
        }
    }
`;

const GET_POSTCODE_LOCATION = gql`
    query Query($postCode: String!) {
        getLocationByPostCode(postCode: $postCode) {
            city
            state
            county
            postCode
            countryCode
            country
        }
    }
`;


export function getGeoLocationDetails(latitude: string, longitude: string): Promise<AddressLocation> {
    return useClient(GET_GEO_LOCATION, { latitude, longitude }).then((data: any) => data.getGeoCodeLocation)
}

export function getLocationByPostCode(postCode: string): Promise<AddressLocation> {
    return useClient(GET_POSTCODE_LOCATION, { postCode }).then((data: any) => data.getLocationByPostCode)
}

