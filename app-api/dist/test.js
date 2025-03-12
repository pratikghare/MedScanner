"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptr_1 = require("./cryptr");
const encrypted = (0, cryptr_1.encrypt)("9a13ff85de154606899b72e4f42d71ca");
console.log();
console.log(encrypted);
console.log();
console.log("Decrypted", (0, cryptr_1.decrypt)(encrypted));
