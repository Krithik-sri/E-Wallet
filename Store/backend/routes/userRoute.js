const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, logoutUser, getUser, getLoginStatus } = require("../controller/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser)
router.get("/getUser",protect,getUser);
router.get("/getLoginStatus",getLoginStatus);

module.exports = router;


