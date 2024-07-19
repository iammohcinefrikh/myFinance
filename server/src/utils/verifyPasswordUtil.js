const crypto = require("crypto");

const verifyPassword = (enteredPassword, storedPassword) => {
  const [salt, storedHash] = storedPassword.split("$");
  const hash = crypto.pbkdf2Sync(enteredPassword, salt, 1000, 64, "sha512").toString("hex");

  return hash === storedHash;
}

module.exports = verifyPassword;