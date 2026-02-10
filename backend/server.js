const express=require("express");
const session=require("express-session")
const cors=require("cors")
const connectDB=require("./config/db")
require("dotenv").config();

const productRoutes=require("./routes/productRoutes")
const authRoutes=require("./routes/authRoutes")

const app=express();

connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "olx-secret", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes)

app.get("/",(req,res)=>{
    res.send("OLX Backend Running")
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
