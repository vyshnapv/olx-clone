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