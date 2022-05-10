const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");

const lib = {};

lib.baseDir = path.join(__dirname, "/../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(lib.baseDir + dir + "/" + file + ".json", "wx", (err, fileDescr) => {
    if (!err) {
      const stringData = JSON.stringify(data);

      fs.writeFile(fileDescr, stringData, (err) => {
        if (!err) {
          fs.close(fileDescr, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", (err, data) => {
    if(!err && data){
        callback(err, helpers.parseJsonToObject(data));
    } else {
        callback(err)
    }
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(lib.baseDir + dir + "/" + file + ".json", "r+", (err, fileDescr) => {
    if (!err && fileDescr) {
      const stringData = JSON.stringify(data);

      fs.ftruncate(fileDescr, (err) => {
        if (!err) {
          fs.writeFile(fileDescr, stringData, (err) => {
            if (!err) {
              fs.close(fileDescr, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback(err);
                }
              });
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(err);
    }
  });
};

module.exports = lib;
