const config = require("config");

module.exports = function () {
  // To set environement variable from terminal: export vidly_jwtPrivateKey=xxx..
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
