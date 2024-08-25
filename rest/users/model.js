const bcrypt = require("bcryptjs");

module.exports = async (sequelize, type) => {

    const user = sequelize.define('users', {

        sid: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: type.STRING,
        password: type.STRING,
        email: type.STRING,


    },{
        hooks:{
            async beforeCreate(user){
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(user.password,salt);
            }
        }
    });

    user.prototype.validPassword = async function(password){
        return await bcrypt.compare(password,this.password);
    }


    return user;
}