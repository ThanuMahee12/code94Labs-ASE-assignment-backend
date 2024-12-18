import express from 'express'
import ProductController from '../controller/Productcontroller'
import { Product } from '@prisma/client';


const ProductRouter=express.Router()
const productController =new ProductController()
ProductRouter.route("/").
get((req,res)=>{

})
.post((req,res)=>{

})
ProductRouter.route("/:productid")
.get((req,res)=>{

})
.put((req,res)=>{
    
})
.delete((req,res)=>{

})
export default ProductRouter;