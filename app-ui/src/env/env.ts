import * as devEnv from "./env.dev";
import * as prodEnv from "./env.prod";

export const env = process.env.NODE_ENV === "production" ? prodEnv : devEnv;