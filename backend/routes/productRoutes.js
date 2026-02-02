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