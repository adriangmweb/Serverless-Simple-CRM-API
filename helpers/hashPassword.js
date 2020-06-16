const bcrypt = require('bcryptjs');
module.exports = async (password, saltRounds = 10) => bcrypt.hash(password, saltRounds);