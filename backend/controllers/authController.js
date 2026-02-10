const User=require("../models/user")
const bcrypt=require("bcrypt")

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login=async(req,res)=>{
  try{
    const {email,password}=req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Wrong Password"})
    }

    req.session.userId=user._id;
    res.json({ 
            message: "Login successful", 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }
            res.json({ message: "Logged out successfully" });
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
};