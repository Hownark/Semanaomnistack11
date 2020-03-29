const crypto = require('crypto'); //usado para gerar id ramdom

module.exports = function gerenateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}