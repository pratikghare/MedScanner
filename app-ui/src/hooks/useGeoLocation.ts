import { useEffect, useState } from "react";

export default function useGeoLocation() {
    const [position, setPosition] = useState<{ longitude: number, latitude: number }>();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    return position;
}