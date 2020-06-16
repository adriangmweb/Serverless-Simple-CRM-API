const bcrypt = require('bcryptjs');

module.exports = async (password, passwordToCompare) => bcrypt.compare(password, passwordToCompare);