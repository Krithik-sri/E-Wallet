const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;

    if (!name || !email || !password){
        res.status(400);
        throw new Error("Required field not filled");
    }

    if (password.length < 6){
        res.status(400);
        throw new Error("Password must be greater than 6 characters")
    }

    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400);
        throw new Error("Email already registered");
    }

    const user = await User.create({ //new user creationZ
        name,
        email,
        password
    })

    const token = generateToken(user._id)

    if(user){
        const { _id, name, email, role } = user  
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none,

        })
        res.status(201).json({
            _id,
            name,
            email,
            role,
            token,
        })
    }
    else{
        res.status(400);
        throw new Error ("Something went wrong");
    }



    res.send("Registering User");
});

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Email or password is empty/invalid")
    }


    const user = await User.findOne({email});

    if (!user) {
        res.status(400);
        throw new Error("The user does not exist");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);


    const token = generateToken(user._id);
    if(user && passwordIsCorrect){

        const loggedinUser = await User.findOne({email}).select("-password");
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none,

        })
        res.status(200).json(loggedinUser);

    }
    else{
        res.status(400);
        throw new Error("Invalid email or password");

    }

})

const logoutUser = asyncHandler(async (req,res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: "User is logged out"})
});

const getUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user_id).select("-password");
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error("User not found");
    }
})


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
};