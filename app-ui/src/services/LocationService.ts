import { geoApifyRevGeoCodeApi, getApifyPostCodeApi } from "../env/env.prod";
import { get } from "./ApiService";


export function getGeoLocationDetails(latitude: number, longitude: number): Promise<any> {
    return get(geoApifyRevGeoCodeApi.replace("{lat}", String(latitude)).replace("{lon}", String(longitude)), false).then((data: any) => data?.features[0]?.properties);
}

export function getLocationByAddress(address: string): Promise<any> {
    return get(getApifyPostCodeApi.replace("{text}", address), false)
    .then(data => data.results?.length ? data.results.find((item: any) => item.country_code === "in") : null);
}