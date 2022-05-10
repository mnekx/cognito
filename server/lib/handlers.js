const helpers = require("./helpers");
const _data = require("./data");

const handlers = {};

handlers._users = {};

handlers._users.post = (data, callback) => {
  const userName =
    typeof data.payload.userName == "string" &&
    data.payload.userName.trim().length > 0
      ? data.payload.userName
      : false;
  const phoneNumber =
    typeof data.payload.phoneNumber == "string" &&
    data.payload.phoneNumber.trim().length == 10
      ? data.payload.phoneNumber
      : false;
  const tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;
  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? helpers.hash(data.payload.password)
      : false;

  const userObj = {
    userName: userName,
    phoneNumber: phoneNumber,
    password: password,
    tosAgreement: tosAgreement,
  };

  if (userName && phoneNumber && tosAgreement && password) {
    _data.create("users", phoneNumber, userObj, (err) => {
      if (!err) {
        callback(200, { message: "User created successfully!" });
      } else {
        console.log(err);
        callback(400, { error: "User with that phone number already exists" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers._users.get = (data, callback) => {
  const phoneNumber =
    typeof data.queryStringObject.phoneNumber == "string" &&
    data.queryStringObject.phoneNumber.trim().length == 10
      ? data.queryStringObject.phoneNumber
      : false;

  const tokenId =
    typeof data.headers.token == "string" ? data.headers.token : false;
  handlers._tokens.verifyToken(tokenId, phoneNumber, (tokenIsValid) => {
    if (tokenIsValid) {
      if (phoneNumber) {
        _data.read("users", phoneNumber, (err, dataBack) => {
          if (!err) {
            delete dataBack.password;
            callback(200, dataBack);
          } else {
            console.log(err);
            callback(404, { error: "Could not find the user!" });
          }
        });
      } else {
        callback(400, { error: "Missing required fields!" });
      }
    } else {
      callback(403, { error: "Token is missing or it is invalid!" });
    }
  });
};

handlers._users.put = (data, callback) => {
  const userName =
    typeof data.payload.userName == "string" &&
    data.payload.userName.trim().length > 0
      ? data.payload.userName
      : false;
  const phoneNumber =
    typeof data.payload.phoneNumber == "string" &&
    data.payload.phoneNumber.trim().length == 10
      ? data.payload.phoneNumber
      : false;
  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (phoneNumber) {
    if (userName || password) {
      const tokenId =
        typeof data.headers.token == "string" ? data.headers.token : false;
      handlers._tokens.verifyToken(tokenId, phoneNumber, (tokenIsValid) => {
        if (tokenIsValid) {
          _data.read("users", phoneNumber, (err, userData) => {
            if (!err && userData) {
              if (userName) {
                userData.userName = userName;
              }
              if (password) {
                userData.password = hashedPassword = helpers.hash(password);;
              }
              _data.update("users", phoneNumber, userData, (err) => {
                if (!err) {
                  callback(200);
                } else {
                  console.log(err);
                  callback(503, { error: "Could not update the user!" });
                }
              });
            } else {
              console.log(err);
              callback(500, { error: "Could not read user information!" });
            }
          });
        } else {
          callback(403, { error: "Token is missing or it is invalid!" });
        }
      });
    } else {
      callback(400, { error: "Missing fields to update!" });
    }
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers._users.delete = (data, callback) => {
  const phoneNumber =
    typeof data.queryStringObject.phoneNumber == "string" &&
    data.queryStringObject.phoneNumber.trim().length == 10
      ? data.queryStringObject.phoneNumber
      : false;

  if (phoneNumber) {
    const tokenId =
      typeof data.headers.token == "string" ? data.headers.token : false;
    handlers._tokens.verifyToken(tokenId, userPhone, (tokenIsValid) => {
      if (tokenIsValid) {
        _data.read("users", phoneNumber, (err, dataBack) => {
          if (!err && dataBack) {
            _data.delete("users", phoneNumber, (err) => {
              if (!err) {
                callback(200);
              } else {
                console.log(err);
                callback(501, { error: "Could not delete the user!" });
              }
            });
          } else {
            console.log(err);
            callback(400, { error: "User could not be found!" });
          }
        });
      } else {
        callback(403, { error: "Token is missing or it is invalid!" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers.users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (data.payload) {
    if (acceptableMethods.indexOf(data.method) > -1) {
      handlers._users[data.method](data, callback);
    } else {
      callback(405);
    }
  } else {
    callback(500, { error: "Error parsing the payload" });
  }
};

// Tokens
handlers._tokens = {};
handlers._tokens.post = (data, callback) => {
  const phoneNumber =
    typeof data.payload.phoneNumber == "string" &&
    data.payload.phoneNumber.length == 10
      ? data.payload.phoneNumber
      : false;

  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password
      : false;

  if (phoneNumber && password) {
    _data.read("users", phoneNumber, (err, dataBack) => {
      if (!err && dataBack) {
        const hashedPassword = helpers.hash(password);
        console.log(hashedPassword);
        const tokenId = helpers.createRandomString(20);
        const expiresOn = Date.now() + 1000 * 60 * 60;
        if (hashedPassword === dataBack.password) {
          const tokenObj = {
            id: tokenId,
            expiresOn: expiresOn,
            phoneNumber: phoneNumber,
          };
          _data.create("tokens", tokenId, tokenObj, (err) => {
            if (!err) {
              callback(200, tokenObj);
            } else {
              console.log(err);
              callback(500, { error: "Error creating new token!" });
            }
          });
        } else {
          callback(400, {
            error: "Password provided did not match the user's password!",
          });
        }
      } else {
        console.log(err);
        callback(404, { error: "Could not find the user!" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers._tokens.get = (data, callback) => {
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id
      : false;
  if (id) {
    _data.read("tokens", id, (err, dataBack) => {
      if (!err) {
        callback(200, dataBack);
      } else {
        console.log(err);
        callback(404, { error: "Could not find the token!" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers._tokens.put = (data, callback) => {
  const id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;
  const extend =
    typeof data.payload.extend == "boolean" && data.payload.extend == true
      ? true
      : false;
  if (extend && id) {
    _data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        if (tokenData.expiresOn > Date.now()) {
          tokenData.expiresOn = Date.now() + 1000 * 60 * 60;

          _data.update("tokens", id, tokenData, (err) => {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { error: "Error updating the token!" });
            }
          });
        } else {
          callback(400, { error: "Token has already expired!" });
        }
      } else {
        console.log(err);
        callback(404, { error: "Token provided does not exists!" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers._tokens.delete = (data, callback) => {
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id
      : false;
  if (id) {
    _data.read("tokens", id, (err, dataBack) => {
      if (!err && dataBack) {
        _data.delete("tokens", id, (err) => {
          if (!err) {
            callback(false);
          } else {
            console.log(err);
            callback(500, { error: "Error deleting file!" });
          }
        });
      } else {
        console.log(err);
        callback(404, { error: "Could not find the token!" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields!" });
  }
};

handlers._tokens.verifyToken = (tokenId, userPhone, callback) => {
  if (tokenId) {
    _data.read("tokens", tokenId, (err, tokenData) => {
      if (!err && tokenData) {
        // Verify the tokenData has the given phone and that it has not expired
        if (
          tokenData.phoneNumber == userPhone &&
          tokenData.expiresOn > Date.now()
        ) {
          callback(true);
        } else {
          console.log(err);
          callback(false);
        }
      } else {
        console.log(err);
        callback(false);
      }
    });
  } else {
    callback(false);
  }
};

handlers.tokens = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];

  console.log(data);

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

handlers.notFound = function (data, callback) {
  callback(404, {});
};

module.exports = handlers;
