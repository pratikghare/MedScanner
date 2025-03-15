import Cryptr from "cryptr";

const cryptr = new Cryptr("Privacy is not something that I'm merely entitled to, it's an absolute prerequisite.");

export const decrypt = (encrypted: string) => cryptr.decrypt(encrypted);

export const encrypt = (value: string) => cryptr.encrypt(value);



// const obj = {
//     city: "Pimpri",
//     state: "Maharashtra",
//     county: "Pune",
//     postCode: "411012",
//     countryCode: "in",
//     country: "India",
//     __typename: "Location"
// };