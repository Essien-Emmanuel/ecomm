const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

class Ncrypt {
  async hash(str, saltLen = 8) {
    const salt = crypto.randomBytes(saltLen).toString("hex");

    try {
      const derivedKeyBuf = await scrypt(str, salt, 64);
      const hashedStr = derivedKeyBuf.toString("hex");
      return `${hashedStr}.${salt}`;
    } catch (error) {
      console.log(error);
    }
  }

  async compare(inputStr, saltedHashedStr) {
    // salted hashed str reps the hashed string plus salt saved in the database

    const [hashedStr, salt] = saltedHashedStr.split(".");

    const saltedHashedBuf = await scrypt(inputStr, salt, 64);
    const hashedInputStr = saltedHashedBuf.toString("hex");

    return hashedInputStr === hashedStr;
  }
}

const ncrypt = new Ncrypt();

module.exports = ncrypt;
