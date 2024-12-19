// Importing necessary modules
import express from 'express'; // Importing express for routing
import ProductController from '../controller/Productcontroller'; // Importing ProductController to manage business logic
import { Product } from '@prisma/client'; // Importing Product type from Prisma schema

// Create an instance of express Router for defining product routes
const ProductRouter = express.Router();

// Create an instance of ProductController
const productController = ProductController.getInstance();

/**
 * Route to handle fetching and adding products.
 */
ProductRouter.route("/")
  /**
   * GET / - Fetch all products with optional pagination.
   */
  .get(async (req, res) => {
    const { query: { page } } = req; // Destructuring to get the page number from query parameters
    try {
      // Validate and parse the page number
      const pagNo = page ? Math.max(1, parseInt(page as string, 10)) : 1;
      const result = await productController.all(pagNo);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message || "Failed to fetch products." });
    }
  })

  /**
   * POST / - Add a new product.
   */
  .post(async (req, res) => {
    const { body: { name, description, sku, quantity } } = req;
    try {
      const result = await productController.addNew({
        name,
        description,
        sku,
        quantity,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message || "Failed to add product." });
    }
  });

/**
 * Route to handle operations for a specific product by ID.
 */
ProductRouter.route("/:productid")
  /**
   * GET /:productid - Fetch a product by its ID.
   */
  .get(async (req, res) => {
    const { params: { productid } } = req; // Destructuring to get the product ID from route parameters
    try {
      if (!productid) throw new Error("Invalid product ID.");
      const result = await productController.findById(productid);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message || "Failed to fetch product." });
    }
  })

  /**
   * PUT /:productid - Update a product by its ID.
   */
  .put(async (req, res) => {
    const { params: { productid }, body: { name, description, sku, quantity } } = req;
    try {
      if (!productid) throw new Error("Invalid product ID.");
      const result = await productController.update(productid, {
        name,
        description,
        sku,
        quantity,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message || "Failed to update product." });
    }
  })

  /**
   * DELETE /:productid - Delete a product by its ID.
   */
  .delete(async (req, res) => {
    const { params: { productid } } = req;
    try {
      if (!productid) throw new Error("Invalid product ID.");
      const result = await productController.delete(productid);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message || "Failed to delete product." });
    }
  });

/**
 * Route to handle product search.
 */
ProductRouter.get("/search", async (req, res) => {
  const { query: { search, page } } = req;
  const pageNo = page ? Math.max(1, parseInt(page as string, 10)) : 1;
  try {
    const result = await productController.searchByKeyword(search as string | number, pageNo);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "Failed to search products." });
  }
});

// Export the ProductRouter so it can be used in other parts of the application
export default ProductRouter;
