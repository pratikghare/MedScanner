import { geoApifyRevGeoCodeApi } from "../env/env.prod";
import { get } from "./ApiService";


export function getGeoLocationDetails(latitude: number, longitude: number): Promise<any> {
    return get(geoApifyRevGeoCodeApi.replace("{lat}", String(latitude)).replace("{lon}", String(longitude)), false).then((data: any) => data?.features[0]?.properties);
}