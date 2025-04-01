export interface User {
    email: string;
    userId: string;
    phone: string;
    name: string;
    initials: string;
    isLoggedIn?: boolean;
    image?: string;
    
}

export interface UserLocation {
    state?: string;
    postCode: string;
    county?: string;
    countryCode: string;
    country: string;
    city: string;
}