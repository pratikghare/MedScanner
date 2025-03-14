import env from "../env/env";
import { decrypt } from "../cryptr";

interface Location {
    countryCode: string,
    country: string,
    state: string,
    city: string,
    county: string
    postCode: string,
    address?: string,
    line1?: string,
    line2?: string,
    line3?: string
}


const geofyGeoCodeApi = `https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey=`;
const getfyPostCodeApi = `https://api.geoapify.com/v1/geocode/search?text={text}&format=json&apiKey=`;

const resolveUrl = (url: string) => {
    return url+decrypt(env.geofyApiKeys[0]);
}


const getGeoCodeLocation = async (_: any, { latitude, longitude } : { latitude: string, longitude: string }) => {
    try {
        const url = geofyGeoCodeApi.replace("{lat}", latitude).replace("{lon}", longitude);
        const response = await fetch(resolveUrl(url));

        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }

        const result = await response.json();
        const data = result.features[0].properties;
        
        if(!data) return null;
        const location: Location = {
            countryCode: data.country_code,
            country: data.country,
            state: data.state,
            city: data.city,
            county: data.county,
            postCode: data.postcode,
            address: data.formatted,
            line1: data.address_line1,
            line2: data.address_line2,
            line3: data.address_line3,
        }

        return location; // ✅ Return the actual API response
    } catch (error) {
        console.error("Error fetching geocode data:", error);
        return null; // Return `null` or a structured error response
    }
}

const getLocationByPostCode = async (_: any, { postCode } : { postCode: string }) => {
    try {
        const url = getfyPostCodeApi.replace("{text}", postCode);
        const response = await fetch(resolveUrl(url));

        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }

        const result = await response.json();
        const data = result.results.find((item: any) => item.country_code === "in");
        
        if(!data) return null;
        const location: Location = {
            countryCode: data.country_code,
            country: data.country,
            state: data.state,
            city: data.city,
            county: data.county,
            postCode: data.postcode,
            address: data.formatted,
            line1: data.address_line1,
            line2: data.address_line2,
            line3: data.address_line3,
        }

        return location; // ✅ Return the actual API response
    } catch (error) {
        console.error("Error fetching geocode data:", error);
        return null; // Return `null` or a structured error response
    }
}



export const locationResolver = {
    Query: {
        getGeoCodeLocation, getLocationByPostCode
    }
}


