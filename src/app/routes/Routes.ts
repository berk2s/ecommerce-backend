import { Request, Response, Application } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { CurrencyController } from "../controllers/CurrencyController";
import { ProductController } from "../controllers/ProductController";
import { tokenMiddleware } from "../middlewares/token-middleware";

class Routes {
  private productController: ProductController;
  private categoryController: CategoryController;
  private currencyController: CurrencyController;

  constructor() {
    this.productController = new ProductController();
    this.categoryController = new CategoryController();
    this.currencyController = new CurrencyController();
  }

  public routes(app: Application): void {
    app.route("/").get((request: Request, response: Response) => {
      response.status(200).send({
        message: "GET request successfully.",
      });
    });

    // TODO: implement middleware to routes

    app
      .route("/products")
      /**
       * @swagger
       * /products:
       *   post:
       *     summary: Create a Product
       *     tags:
       *      - Products
       *     responses:
       *       201:
       *         description: Product created successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               productName:
       *                 type: string
       *                 description: The products's name.
       *                 example: Arçelik
       *               categories:
       *                 type: array
       *                 description: category id
       *                 example: [1,2]
       */
      .post(this.productController.saveProduct)

      /**
       * @swagger
       * /products:
       *   get:
       *     summary: Retrieve a list of products
       *     description: Retrieve a list of products.
       *     tags:
       *      - Products
       *     responses:
       *       200:
       *         description: A list of products.
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 response:
       *                   type: array
       *                   items:
       *                     type: object
       *                     properties:
       *                       id:
       *                         type: integer
       *                         description: The product ID.
       *                         example: 1
       *                       productName:
       *                         type: string
       *                         description: The user's name.
       *                         example: Samsung Galaxy S10
       *                       description:
       *                        type: string
       *                        description: The product description.
       *                        example: Samsung Galaxy S10 is a smartphone by Samsung.
       *                       status:
       *                        type: string
       *                        description: The product status.
       *                        example: Available
       *
       */
      .get(this.productController.getProducts);

    app
      .route("/products/:id")
      /**
       * @swagger
       * /products/{id}:
       *   get:
       *     summary: Retrieve a single product.
       *     description: Retrieve a single product
       *     tags:
       *      - Products
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: A single product.
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 response:
       *                   type: object
       *                   properties:
       *                     id:
       *                       type: integer
       *                       description: The product ID.
       *                       example: 0
       *                     productName:
       *                       type: string
       *                       description: The product's name.
       *                       example: Arçelik
       *                     description:
       *                       type: string
       *                       description: The product description.
       *                       example: Arçelik is a brand.
       *                     status:
       *                       type: string
       *                       description: The product status.
       *                       example: Available
       */

      .get(this.productController.getProduct)

      /**
       * @swagger
       * /products/{id}:
       *   delete:
       *     summary: Retrieve a single product.
       *     description: Retrieve a single product
       *     tags:
       *      - Products
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       204:
       *        description: Product deleted successfully
       */
      .delete(this.productController.deleteProduct)

      /**
       * @swagger
       * /products/{id}:
       *   put:
       *     summary: Update a Product
       *     tags:
       *      - Products
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: Product updated successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               productName:
       *                 type: string
       *                 description: The products's name.
       *                 example: Arçelik
       */
      .put(this.productController.updateProduct);

    app
      .route("/categories/:id")
      .get(this.categoryController.getCategoryById)
      .delete(this.categoryController.deleteCategory)
      .post(this.categoryController.updateCategory);

    app
      .route("/categories")
      .post(this.categoryController.saveCategory)
      .get(this.categoryController.getCategories);

    app
      .route("/currencies")
      .get(this.currencyController.getCurrencies)
      .post(this.currencyController.saveCurrency);

    app
      .route("/currencies/:id")
      .delete(this.currencyController.deleteCurrency)
      .post(this.currencyController.updateCurrency);
  }
}

export { Routes };
