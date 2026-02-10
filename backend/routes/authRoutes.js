const express=require("express");
const User = require("../models/user");
const {signup,login,logout}=require("../controllers/authController")

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ user: null });
  }

  User.findById(req.session.userId).then((user) => {
    res.json({ user });
  });
});

module.exports=router;