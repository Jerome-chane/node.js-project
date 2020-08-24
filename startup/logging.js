const winston = require("winston"); // error logger
// require("winston-mongodb");
require("express-async-errors"); // this is used to handle errors when calling the server

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExeption.log" })
  );
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });
};
