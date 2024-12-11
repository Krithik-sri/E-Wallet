const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req,res,next) => {
    try{
        const token = req.cookies.token;
        if (!token){
            res.status(401);
            throw new Error("Not authorized");
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified){
            res.status(401);
            throw new Error("The user is not verified");
        }
        const user = await User.findById(verified.id).select("-password");
        if (!user) {
            res.status(400);
            throw new Error("The user does not exist");
        }
        req.user = user;
        next();
    }
    catch (error){
        res.status(404);
        throw new Error("Not authorized. User not logged in");
    }
});

module.exports = {
    protect,
}