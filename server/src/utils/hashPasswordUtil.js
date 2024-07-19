const crypto = require("crypto");

const hashPassword = (userPassword) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(userPassword, salt, 1000, 64, "sha512").toString("hex");
  
  return [salt, hash].join("$");
}

module.exports = hashPassword;