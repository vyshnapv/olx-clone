const Product = require("../models/product");

exports.createProduct = async (req, res) => {
    try {
        const {
           title,
           price,
           category,
           description,
           location,
        } = req.body;

        if (!title || !price || !req.file) {
           return res.status(400).json({
             message: "Title, price and image are required",
           });
        }

        const newProduct = await Product.create({
            title,
            price,
            category,
            description,
            location,
            image: req.file.path,
            userId: req.session.userId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Error creating product: " });
    }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({
      message: "Error fetching products",
    });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({
      userId: req.session.userId,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Get user products error:", error);
    res.status(500).json({
      message: "Error fetching user products",
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Get single product error:", error);
    res.status(500).json({
      message: "Error fetching product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or not authorized",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      message: "Error deleting product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.session.userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found or not authorized",
      });
    }

    return res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      message: "Error updating product",
    });
  }
};
