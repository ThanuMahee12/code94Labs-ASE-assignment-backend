// Importing necessary modules
import express from 'express'; // Importing express for routing
import ProductController from '../controller/Productcontroller'; // Importing ProductController to manage business logic
import { Product } from '@prisma/client'; // Importing Product type from Prisma schema

// Create an instance of express Router for defining product routes
const ProductRouter = express.Router();

// Create an instance of ProductController
const productController = ProductController.getInstace();

/**
 * GET /products
 * Fetch a list of products based on pagination
 * Query parameter:
 *   - page (optional): The page number for pagination
 * Response:
 *   - 200 OK: Returns the page number as a JSON response
 */
ProductRouter.route("/")
  .get((req, res) => {
    const { query: { page } } = req; // Destructuring to get the page number from query parameters
    res.status(200).json(page); // Responds with the page number as a JSON response
  })
  .post((req, res) => {
    // POST endpoint (currently empty, you can implement the logic here)
    res.status(200).json({ message: "Post endpoint for products" });
  });

/**
 * GET /products/:productid
 * Fetch a specific product by product ID
 * Route parameter:
 *   - productid: The ID of the product to retrieve
 * Response:
 *   - 200 OK: Returns the product ID as a JSON response
 */
ProductRouter.route("/:productid")
  .get((req, res) => {
    const { params: { productid } } = req; // Destructuring to get the product ID from route parameters
    res.status(200).json(productid); // Responds with the product ID as a JSON response
  })
  .put((req, res) => {
    const { params: { productid } } = req; // Destructuring to get the product ID from route parameters
    res.status(200).json({ message: `Product with ID ${productid} updated successfully` }); // Placeholder for updating product
  })
  .delete((req, res) => {
    const { params: { productid } } = req; // Destructuring to get the product ID from route parameters
    res.status(200).json({ message: `Product with ID ${productid} deleted successfully` }); // Placeholder for deleting product
  });

// Export the ProductRouter so it can be used in other parts of the application
export default ProductRouter;
