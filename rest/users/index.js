
const db = require("../../db");
const jwt = require("jsonwebtoken");
const customError = require("../../utils/httpErr");
const { validatePassword } = require("../../utils/tools");

const createUser = async (data) => {

    try {

        const { Op, userModel } = await db();
        const createObj = {
            username: data?.user,
            email: data?.email,
            password: data?.password
        };

        const model = await userModel;

        const isAvailUser = await model.findOne({
            where: { username: data?.user }
        })
        if (isAvailUser) {
            throw new customError(400, "User is already exists!");
        }

        const isAvailEmail = await model.findOne({
            where: { email: data?.email }
        })
        if (isAvailEmail) {
            throw new customError(400, "Email already exists!");
        }

        await model.create(createObj);
        return {
            error: false,
            statusCode: 200,
            message: "Successfully user created!"
        }

    }
    catch (error) {

        console.log("inner error :", error)
        return {
            error: true,
            statusCode: error?.statusCode || 400,
            message: error?.message || "Failed to create user!",
        }

    }

}



const login = async (data) => {

    try {

        console.log("data : ", data)
        const { Op, userModel } = await db();
        const user = await userModel;

        let isAvail = await user.findOne({
            where: { username: data?.user }
        });

        if (!isAvail) {
            isAvail = await user.findOne({
                where: { email: data?.user }
            });
        }

        if (isAvail) {

            const password = isAvail?.dataValues?.password;
            const check = await validatePassword(data?.password, password);
            const userName = isAvail?.dataValues?.username;
            const email = isAvail?.dataValues?.email;
            const obj = {
                name:userName,
                email:email,
            }
            const token = jwt.sign(obj,"key");
            if (check) {
                return {
                    error: false,
                    message: "Successfully logged in!",
                    body:JSON.stringify({
                        token:`JWT ${token}`,
                    }),
                    statusCode: 200,
                }
            }
            else {
                throw new customError(400, "Password is incorrect!");
            }
        }
        else {
            throw new customError(404, "User not found!");
        }

    }
    catch (error) {

        return {
            error: true,
            statusCode: error?.statusCode || 400,
            message: error?.message || "Login failed!"
        }

    }


}



module.exports = {

    createUser,
    login,

}