//Product Controller for Handle ProductController
import { Product } from '@prisma/client';
import prismaClient from './../prisma/prismaClient';
import Controller from './Controller';
import CrudController from './CrudController';
import { item_per_page } from '../helper/Env';


class ProductController extends Controller implements CrudController {
    /**
     * Adds a new product to the database.
     * @param obj - The product object to add.
     * @returns A promise resolving to the created product.
     */
    async addNew(obj: Object): Promise<Product> {
        try {
            const product = await prismaClient.product.create({
                data: obj as Product,
            });
            return product;
        } catch (error) {
            throw new Error(`Failed to add product: ${(error as Error).message}`);
        }
        finally{
            // Disconnect Prisma client after operation
            prismaClient.$disconnect()
        }
    }
    /**
     * all a  products from the database.
     * @param page - The page.
     * @returns A promise resolving data.
     */
    async all(page?:number):Promise<Object>{
        try {
    const count=await prismaClient.product.count()
    const lastPage=count/item_per_page
    const currentPage=page??1
    const data=await prismaClient.product.findMany({
        skip:currentPage,
        take:item_per_page,
    })
    return {
        currentPage,
        lastPage,
        data,
        count
    }
        } catch (error) {
            throw new Error(`Failed to show product: ${(error as Error).message}`);
        }finally{
            // Disconnect Prisma client after operation
            await prismaClient.$disconnect()
        }
    }
      /**
     * findById a  products from the database.
     * @param id - product id.
     * @returns A promise resolving product.
     */
      async findById(productid:number|string):Promise<Object>{
        try {
            const product=await prismaClient.product.findUniqueOrThrow({where:{
                id:productid.toString()
            }})
            return product
        } catch (error) {
            throw new Error(`Failed to show product: ${(error as Error).message}`);
        }finally{
            // Disconnect Prisma client after operation
            prismaClient.$disconnect()
        }
    }
    /**
     * all a  products from the database.
     *@param id - product id.
     * @returns A promise resolving data.
     */
    async delete(productid:number|string):Promise<Object>{
        try {
            let product=await prismaClient.product.findUniqueOrThrow({where:{
                id:productid.toString()
            }})
            product=await prismaClient.product.delete({where:{
                id:productid.toString()
            }})
            return product
        } catch (error) {
            throw new Error(`Failed to delete product: ${(error as Error).message}`);
        }finally{
            // Disconnect Prisma client after operation
            await prismaClient.$disconnect()
        }
    }
    /**
     * all a  products from the database.
     * @param productid - The productid.
     * @returns A promise resolving data.
     */
    async update(productid:number|string,obj:Object):Promise<Object>{
        try {
            let product=await prismaClient.product.findFirstOrThrow({where:{
                id:productid.toString()
            }})
            product=await prismaClient.product.update({where:{
        id:productid.toString(),
    },
data:obj
})
return product
        } catch (error) {
            throw new Error(`Failed to update product: ${(error as Error).message}`);
        }finally{
            // Disconnect Prisma client after operation
           await  prismaClient.$disconnect()
        }
    }
    /**
     * all a  products from the database.
     * @param page - The page.
     * @returns A promise resolving data.
     */
    async  searchByKeyword(keyword?:number|string,page?:number):Promise<Object>{
        try {
              // Use Prisma's query with the "contains" operator for partial string matching
    const count=await prismaClient.product.count()
    const lastPage=count/item_per_page
    const currentPage=page??1
        const data = await prismaClient.product.findMany({
            skip:currentPage,
            take:item_per_page,
            where: {
                OR: [
                    {
                        name: {
                            contains: keyword?.toString(),    // Searching in the 'name' field
                            mode: 'insensitive',  // Case-insensitive search
                        },
                    },
                    {
                        sku: {
                            contains: keyword?.toString(),    // Searching in the 'sku' field
                            mode: 'insensitive',  // Case-insensitive search
                        },
                    },
                    {
                        description: {
                            contains: keyword?.toString(),    // Searching in the 'description' field
                            mode: 'insensitive',  // Case-insensitive search
                        },
                    },
                ],
            },
        });

        return {data,currentPage,lastPage,count};  // Return the list of products matching the search criteria
        } catch (error) {
            throw new Error(`Failed to show product: ${(error as Error).message}`);
        }finally{
            // Disconnect Prisma client after operation
            await prismaClient.$disconnect()
        }
    }

}
export default ProductController