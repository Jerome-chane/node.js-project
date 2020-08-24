const winston = require("winston");
module.exports = function (err, req, res, next) {
  // error handling (this is the "next" in the catch block)
  winston.error(err.message, err);
  res.status(500).send("Something went wrong..");
};
