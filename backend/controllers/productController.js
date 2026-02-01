const Product = require("../models/product");
const cloudinary=require("../config/cloudinary")

exports.createProduct=async(req,res)=>{
    try{
       const {title,price,category,description,location,image,userId}=req.body;

       const newProduct=await Product.create({
        title,
        price,
        category,
        description,
        location,
        image,
        userId,
       });

      res.status(201).json(newProduct);
    }catch(error){
       res.status(500).json({message:error.message})
    }
}

exports.getAllProducts=async(req,res)=>{
   try{
      const products=await Product.find().sort({createdAt:-1});
      res.json(products);
   }catch(error){
      res.status(500).json({message:error.message})
   }
}

exports.getUserProducts=async(req,res)=>{
   try{
      const products=await Product.find({userId:req.params.id});
      res.json(products)
   }catch(error){
      res.status(500).json({message:error.message})
   }
}

exports.deleteProduct=async(req,res)=>{
   try{
      await Product.findByIdAndDelete(req.params.id);
      res.json({message:"product deleted"})
   }catch(error){
      res.status(500).json({message:error.message})
   }
}

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
