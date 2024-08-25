const bcrypt = require("bcryptjs");

async function validatePassword(password, comparePassword) {

    const valid = await bcrypt.compare(password, comparePassword);
    if (valid) {
        return true;
    }
    else {
        return false;
    }

}

module.exports = {
    validatePassword,
}