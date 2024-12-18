import express from 'express'

const ProductRouter=express.Router()
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