let env;

if (process.env.NODE_ENV === "production") {
  env = require("./env.prod").default;
} else {
  env = require("./env.dev").default;
}

export default env;
