const User=require("../models/user")
const bcrypt=require("bcrypt")

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Wrong Password"})
    }

    req.session.userId=user._id;
    res.json({message:"Login Successful",user})
}

exports.logout=(req,res)=>{
    req.session.destroy();
    res.json({message:"Logged Out"})
}