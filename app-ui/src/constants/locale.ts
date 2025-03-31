
import apolloLogo from "../assets/pharmacies/apolloLogo.png"
import flipkartLogo from "../assets/pharmacies/flipkartLogo.png"
import medkartLogo from "../assets/pharmacies/medkartLogo.png"
import medplusmartLogo from "../assets/pharmacies/medplusmartLogo.png"
import myUpcharLogo from "../assets/pharmacies/myUpcharLogo.png"
import netmedsLogo from "../assets/pharmacies/netmedsLogo.png"
import pasumaiPharmacyLogo from "../assets/pharmacies/pasumaiPharmacyLogo.png"
import pharmeasyLogo from "../assets/pharmacies/pharmeasyLogo.png"
import pusleplusLogo from "../assets/pharmacies/pusleplusLogo.png"
import tata1mgLogo from "../assets/pharmacies/tata1mgLogo.png"
import truemedsLogo from "../assets/pharmacies/truemedsLogo.png"

interface ImageProp {
    name: string;
    image: string;
    className?: string;
}
export const pharmacyImages: Array<ImageProp> = [
    { name: 'Apollo Pharmacy', image: apolloLogo },
    { name: 'Netmeds', image: netmedsLogo },
    { name: 'Pulse Plus', image: pusleplusLogo },
    { name: 'Medkart', image: medkartLogo },
    { name: 'PharmEasy', image: pharmeasyLogo },
    { name: 'MedPlus Mart', image: medplusmartLogo },
    { name: 'MyUpchar', image: myUpcharLogo },
    { name: 'Pasumai Pharmacy', image: pasumaiPharmacyLogo },
    { name: 'Flipkart Health', image: flipkartLogo },
    { name: 'Tata 1mg', image: tata1mgLogo, className: "-mb-2 bg-white bg-opacity-40 rounded-sm" },
    { name: 'Truemeds', image: truemedsLogo },
] as const;


export enum LoginType {
    LOGIN = "Login", FORGOT = "Forgot Password", REGISTER = "Sign up"
}

export const NO_IMAGE = "https://images.unsplash.com/broken";

export const Themes = {
    dark: "dark",
    light: "light",
    system: "system"
} as const;
export type Theme = (typeof Themes)[keyof typeof Themes];

export interface ThemeState {
    theme: Theme;
    current: Theme;
}

export const styles = {
    basePadding: " pl-2 pr-3 md:pl-3 md:pr-4 "
} as const;

export const NavigationTabKeys = {
    home: "home",
    nearBy: "nearBy",
    account: "account"
} as const;