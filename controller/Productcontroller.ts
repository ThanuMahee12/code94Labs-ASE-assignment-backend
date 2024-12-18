
import { Product } from '@prisma/client';
import prismaClient from './../prisma/prismaClient';
class ProductController{
async addNew(product:Product):Promise<Product>{
const productdata=await prismaClient.product.create({
    data:product
})
return productdata
}
async showall(page?:number):Promise<any>{
const pageNo:number=page??1
const itemPerPage=parseInt(process.env.ITEM_PER_PAGE??'0')
const data=await prismaClient.product.findMany({
    skip:pageNo-1,
    take:itemPerPage
})
return {
    pageNo,
    itemPerPage,
    data,
}
}
}
export default ProductController