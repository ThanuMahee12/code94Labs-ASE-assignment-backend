import express from 'express'
import ProductController from '../controller/Productcontroller'
import { Product } from '@prisma/client';


const ProductRouter=express.Router()
const productController =new ProductController()
ProductRouter.route("/").
get((req,res)=>{
const {query:{page}}=req
res.status(200).json(page)
})
.post((req,res)=>{

})
ProductRouter.route("/:productid")
.get((req,res)=>{
const {params:{productid}}=req
res.status(200).json(productid)
})
.put((req,res)=>{
    const {params:{productid}}=req  
    res.status(200).json(productid)
})
.delete((req,res)=>{
    const {params:{productid}}=req
    res.status(200).json(productid)
})
export default ProductRouter;