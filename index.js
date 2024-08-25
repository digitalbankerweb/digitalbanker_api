const express = require('express');
const app = express();
const middleware = require('./authMiddleware').middleware;
const cors = require('cors');
const customError = require("./utils/httpErr");

const userController = require("./rest/users");

// Use CORS middleware
app.use(cors());
app.options("*", cors());

// Use JSON parsing middleware
app.use(express.json());

// Example of using the auth middleware
app.post('/', async function (req, res) {
    try {
        const data = req.body;
        const process = await userController.createUser(data);
        if (process?.error) {
            throw new customError(400, process?.message);
        }
        else {
            res.status(200).json({
                error: false,
                statusCode: 200,
                message: process?.message || "Successfully craeted user!",
            })
        }
    }
    catch (error) {
        console.log("errrrror:", error)
        res.status(400).json({
            error: true,
            statusCode: error?.statusCode || 400,
            message: error?.message || "Something went wrong!"
        })
    }
});



app.post("/login", async function (req, res) {

    try {
        const data = req.body;
        const process = await userController.login(data);
        if (process?.error) {
            throw new customError(process?.statusCode, process?.message);
        }
        else {
            res.status(200).json({
                error: false,
                statusCode: 200,
                message: process?.message || "Login successful!",
                body:process?.body || {},
            })
        }
    }
    catch (error) {
        console.log("errrrror:", error)
        res.status(400).json({
            error: true,
            statusCode: error?.statusCode || 400,
            message: error?.message || "Login failed!"
        })
    }
});





// Start the server
app.listen(5000, function () {
    console.log("Server is started on port 5000!");
});
