export interface User {
    name: string;
    initials: string;
    image?: string;
    emailId: string;
    userId: string;
    password: string;
    phone?: string;
}

export interface AddressLocation {
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