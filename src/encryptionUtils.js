// src/encryptionUtils.js
const CryptoJS = require('crypto-js');

function encryptData(data, key, iv) {
  return CryptoJS.AES.encrypt(data, key, { iv }).toString();
}

function decryptData(encryptedData, key, iv) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key, { iv });
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encryptData,
  decryptData,
};
