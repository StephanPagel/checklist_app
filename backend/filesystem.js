const fs = require("fs");

const readJSON = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

const writeJSON = (path, data) => {
  const JSONString = JSON.stringify(data, null, 2);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSONString, (err) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports = {
  readJSON,
  writeJSON,
};
