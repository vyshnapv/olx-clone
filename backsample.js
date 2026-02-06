//server.js
const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config();

const productRoutes=require("./routes/productRoutes")

const app=express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log(err))

app.use("/api/products",productRoutes)

app.get("/",(req,res)=>{
    res.send("OLX Backend Running")
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//.env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/olx-clone

CLOUDINARY_CLOUD_NAME=dwwfvh49i
CLOUDINARY_API_KEY=932839436544411
CLOUDINARY_API_SECRET=NCyXD6kz_N5HwWmuQ0awwBUPsbE

//cloudinary.js
const cloudinary=require("cloudinary").v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

module.exports=cloudinary;

//productcontroller.js
const Product = require("../models/product");

exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            price,
            category,
            description,
            location,
            image,
            userId,
        } = req.body;

        if (!title || !price || !image || !userId) {
            return res.status(400).json({
                message: "Missing required fields: title, price, image, and userId are required",
            });
        }

        const newProduct = await Product.create({
            title,
            price,
            category,
            description,
            location,
            image,
            userId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Error creating product: " + error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error("Get all products error:", error);
        res.status(500).json({ message: "Error fetching products: " + error.message });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.params.id });
        res.json(products);
    } catch (error) {
        console.error("Get user products error:", error);
        res.status(500).json({ message: "Error fetching user products: " + error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Error deleting product: " + error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json(updated);
    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Error updating product: " + error.message });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Get single product error:", error);
        res.status(500).json({ message: "Error fetching product: " + error.message });
    }
};

//product.js
const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
    {
     title: String,
     price: Number,
     category: String,
     description: String,
     image: String,
     location: String,
     userId: String,
    },
    {timestamps:true}
)

module.exports=mongoose.model("Product",productSchema)

//productRoutes
const express=require("express");
const router=express.Router();
 const { 
     createProduct,
     getAllProducts,
     getUserProducts,
     deleteProduct,
     updateProduct,
     getSingleProduct,
 } = require("../controllers/productController")

router.post("/",createProduct);
router.get("/",getAllProducts);
router.get("/user/:id",getUserProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id",deleteProduct);
router.put("/:id", updateProduct);



module.exports=router;