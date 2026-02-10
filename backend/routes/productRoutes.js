const express=require("express");
const isAuth=require("../middleware/authMiddleware")
const upload=require("../middleware/upload")

const router=express.Router();

 const { 
     createProduct,
     getAllProducts,
     getUserProducts,
     deleteProduct,
     updateProduct,
     getSingleProduct,
 } = require("../controllers/productController")

router.post("/",isAuth,upload.single("image"),createProduct);
router.get("/",getAllProducts);
router.get("/my-ads", isAuth, getUserProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id",isAuth,deleteProduct);
router.put("/:id",isAuth,upload.single("image"),updateProduct);

module.exports=router;