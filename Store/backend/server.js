const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");

const app = express()

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));
app.use(
    cors({
        origin: ["http://localhost:3000", "https://localhost:6000"],
        credentials: true,
    })

);


// Routes

app.use("/api/users", userRoute);


app.get("/", (req,res) => {
    res.send("Home Page")
})

const PORT = process.env.PORT || 5000


mongoose.connect(process.env.MONGO_URI).then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch((err) => console.log(err));


