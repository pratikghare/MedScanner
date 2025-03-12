import { decrypt, encrypt } from "./cryptr";

const encrypted = encrypt("9a13ff85de154606899b72e4f42d71ca")
console.log()
console.log(encrypted);
console.log()
console.log("Decrypted", decrypt(encrypted));
