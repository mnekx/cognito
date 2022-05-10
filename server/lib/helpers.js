const crypto = require("crypto");
const config = require("./config");

const helpers = {};

helpers.parseJsonToObject = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return false;
  }
};

helpers.hash = (str) => {
  if (typeof str == "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

helpers.createRandomString = (strLength) => {
  strLength = typeof strLength == 'number' && strLength > 0? strLength: false;

  const chars = 'abcdefghijklmnopqrstuvwxyz';

  let str = '';
  if(strLength) {
    for (let i = 0; i < strLength; i++) {
      str +=  chars.charAt(Math.floor(Math.random() * chars.length)) 
    }
    return str
  } else {
    return false;
  }
}

module.exports = helpers;
