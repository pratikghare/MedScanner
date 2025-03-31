"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationResolver = void 0;
const env_1 = __importDefault(require("../env/env"));
const cryptr_1 = require("../cryptr");
const geofyGeoCodeApi = `https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey=`;
const getfyPostCodeApi = `https://api.geoapify.com/v1/geocode/search?text={text}&format=json&apiKey=`;
const resolveUrl = (url) => {
    return url + (0, cryptr_1.decrypt)(env_1.default.geofyApiKeys[0]);
};
const getGeoCodeLocation = (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { latitude, longitude }) {
    try {
        const url = geofyGeoCodeApi.replace("{lat}", latitude).replace("{lon}", longitude);
        const response = yield fetch(resolveUrl(url));
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        const result = yield response.json();
        const data = result.features[0].properties;
        if (!data)
            return null;
        const location = {
            countryCode: data.country_code,
            country: data.country,
            state: data.state,
            city: data.city,
            county: data.suburb ? data.suburb : data.county,
            postCode: data.postcode,
            address: data.formatted,
            line1: data.address_line1,
            line2: data.address_line2,
            line3: data.address_line3,
        };
        return location; // ✅ Return the actual API response
    }
    catch (error) {
        console.error("Error fetching geocode data:", error);
        return null; // Return `null` or a structured error response
    }
});
const getLocationByPostCode = (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { postCode }) {
    try {
        const url = getfyPostCodeApi.replace("{text}", postCode);
        const response = yield fetch(resolveUrl(url));
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        const result = yield response.json();
        const data = result.results.find((item) => item.country_code === "in");
        if (!data)
            return null;
        const location = {
            countryCode: data.country_code,
            country: data.country,
            state: data.state,
            city: data.city,
            county: data.suburb ? data.suburb : data.county,
            postCode: data.postcode,
            address: data.formatted,
            line1: data.address_line1,
            line2: data.address_line2,
            line3: data.address_line3,
        };
        return location; // ✅ Return the actual API response
    }
    catch (error) {
        console.error("Error fetching geocode data:", error);
        return null; // Return `null` or a structured error response
    }
});
exports.locationResolver = {
    Query: {
        getGeoCodeLocation, getLocationByPostCode
    }
};
