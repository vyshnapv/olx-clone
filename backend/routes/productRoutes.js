const express=require("express");
const router=express.Router();
 const { 
     createProduct,
     getAllProducts,
     getUserProducts,
     deleteProduct,
     updateProduct,
 } = require("../controllers/productController")

router.post("/",createProduct);
router.get("/",getAllProducts);
router.get("/user/:id",getUserProducts);
router.delete("/:id",deleteProduct);
router.put("/:id", updateProduct);


module.exports=router;