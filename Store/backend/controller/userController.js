const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req,res) => {
    res.send("Registering User")
});

module.exports = {
    registerUser,
};