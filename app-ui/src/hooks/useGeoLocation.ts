import { useEffect, useState } from "react";

export default function useGeoLocation() {
    const [position, setPosition] = useState<{ longitude: number; latitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        const successCallback = (position: GeolocationPosition) => {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            setError(null); // Clear previous errors
        };

        const errorCallback = (err: GeolocationPositionError) => {
            setError(err.message);
            console.error("Geolocation error:", err);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    }, []);

    return { position, error };
}