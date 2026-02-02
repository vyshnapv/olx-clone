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