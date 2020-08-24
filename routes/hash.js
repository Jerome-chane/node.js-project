const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10); // generates a long random string for extra protection
  const hashed = bcrypt.hash("", salt);

  console.log(salt);
}
run();
