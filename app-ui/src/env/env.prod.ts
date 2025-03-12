const API_KEY = "AIzaSyDUvzpW86EFTbqzQln31hoMzxNvtuJBaI0";
export const LOCATION_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${API_KEY}`;


const openWeatherApiKey = "ca0fde392506bf37702cab4998bdf5e1";
export const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${openWeatherApiKey}`;


const geoApifyKey = "9a13ff85de154606899b72e4f42d71ca";
export const geoApifyRevGeoCodeApi = `https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey=${geoApifyKey}`;
export const getApifyPostCodeApi = `https://api.geoapify.com/v1/geocode/search?text={text}&format=json&apiKey=${geoApifyKey}`;
export const apiUrl = "https://medscanner.onrender.com";