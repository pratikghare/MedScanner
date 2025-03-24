import { useEffect, useState } from "react";

export default function useGeoLocation() {
    const [position, setPosition] = useState<{latitude: string, longitude: string}>();
    const [error, setError] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<number | null>(null);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        const successCallback = (position: GeolocationPosition) => {
            setPosition({
                latitude: String(position.coords.latitude),
                longitude: String(position.coords.longitude)
            });
            setError(null);
            setErrorCode(null);
        }

        const errorCallback = (error: GeolocationPositionError) => {
            console.log("GeoLocation Error: ", error);
            setError(error.message);
            setErrorCode(error.code);
        }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);

    return { position, error, errorCode };
}