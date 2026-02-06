const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config();

const productRoutes=require("./routes/productRoutes")

const app=express();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("Mongo error:", err))

app.use("/api/products",productRoutes)

app.get("/",(req,res)=>{
    res.send("OLX Backend Running")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
