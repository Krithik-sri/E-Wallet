const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be longer than 6 characters"],
    },
    role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer","admin"],
    },
    photo: {
        type: String,
        required:[true, "Please add a photo"],
        default: "https://imgur.com/gallery/one-piece-luffy-gear-5-wallpaper-minimalist-1920x1080-e9eMGkp",
    },
    phone: {
        type: String,
        default: "+91",
    },
    address: {
        type: Object,
    },

});

//Encryption

userSchema.pre("save", async function (next) {
    if (this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        const hashedpwd = await bcrypt.hash(this.password, salt);
        this.password = hashedpwd;
        next()
    }
    else{
        return next
    } 
})

const User = mongoose.model("User",userSchema);
module.exports = User;