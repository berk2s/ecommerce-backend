import { Request, Response, Application } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { CurrencyController } from "../controllers/CurrencyController";
import { PriceController } from "../controllers/PriceController";
import { ProductController } from "../controllers/ProductController";
import { tokenMiddleware } from "../middlewares/token-middleware";

class Routes {
  private productController: ProductController;
  private categoryController: CategoryController;
  private currencyController: CurrencyController;
  private priceController: PriceController;

  constructor() {
    this.productController = new ProductController();
    this.categoryController = new CategoryController();
    this.currencyController = new CurrencyController();
    this.priceController = new PriceController();
  }

  public routes(app: Application): void {
    app.route("/").get((request: Request, response: Response) => {
      response.status(200).send({
        message: "GET request successfully.",
      });
    });

    // TODO: implement middleware to routes

    app
      .route("/api/v1/products")
      /**
       * @swagger
       * /api/v1/products:
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
       * /api/v1/products:
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
       *                         description: The product's name.
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
      .route("/api/v1/products/:id")
      /**
       * @swagger
       * /api/v1/products/{id}:
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
       * /api/v1/products/{id}:
       *   delete:
       *     summary: Delete a single product.
       *     description: Delete a single product
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
       * /api/v1/products/{id}:
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
      .route("/api/v1/categories")
      /**
       * @swagger
       * /api/v1/categories:
       *   post:
       *     summary: Create a Category
       *     tags:
       *      - Categories
       *     responses:
       *       201:
       *         description: Category created successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               id:
       *                type: integer
       *                description: The category id.
       *                example: 1
       *               categoryName:
       *                 type: string
       *                 description: The category's name.
       *                 example: Television
       *               parents:
       *                 type: array
       *                 description: category id
       *                 example: [1,2]
       */
      .post(this.categoryController.saveCategory)
      /**
       * @swagger
       * /api/v1/categories:
       *   get:
       *     summary: Retrieve a list of categories
       *     description: Retrieve a list of categories.
       *     tags:
       *      - Categories
       *     responses:
       *       200:
       *         description: A list of categories.
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
       *                         description: The category ID.
       *                         example: 1
       *                       categoryName:
       *                         type: string
       *                         description: The category's name.
       *                         example: Television
       *                       parents:
       *                         type: array
       *                         description: The category's parents.
       *                         example: []
       *
       */
      .get(this.categoryController.getCategories);

    app
      .route("/api/v1/categories/:id")
      /**
       * @swagger
       * /api/v1/categories/{id}:
       *   get:
       *     summary: Retrieve a single category.
       *     description: Retrieve a single category
       *     tags:
       *      - Categories
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: A single category.
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
       *                     categoryName:
       *                       type: string
       *                       description: The product's name.
       *                       example: Arçelik
       *                     parents:
       *                      type: array
       *                      description: The product's parents.
       *                      example: []
       */
      .get(this.categoryController.getCategoryById)
      /**
       * @swagger
       * /api/v1/categories/{id}:
       *   delete:
       *     summary: Delete a single category.
       *     description: Delete a single category
       *     tags:
       *      - Categories
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       204:
       *        description: Category deleted successfully
       */
      .delete(this.categoryController.deleteCategory)
      /**
       * @swagger
       * /api/v1/categories/{id}:
       *   put:
       *     summary: Update a Category
       *     tags:
       *      - Categories
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: Category updated successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               categoryName:
       *                 type: string
       *                 description: The category's name.
       *                 example: Television
       */
      .put(this.categoryController.updateCategory);

    app
      .route("/api/v1/currencies")
      /**
       * @swagger
       * /api/v1/currencies:
       *   get:
       *     summary: Retrieve a list of currencies
       *     description: Retrieve a list of currencies.
       *     tags:
       *      - Currencies
       *     responses:
       *       200:
       *         description: A list of currencies.
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
       *                         description: The category ID.
       *                         example: 1
       *                       currencyName:
       *                         type: string
       *                         description: The currency's name.
       *                         example: TRY
       *                       price:
       *                         type: array
       *                         description: The price's parents.
       *                         example: []
       *
       */
      .get(this.currencyController.getCurrencies)

      /**
       * @swagger
       * /api/v1/currencies:
       *   post:
       *     summary: Create a Currency
       *     tags:
       *      - Currencies
       *     responses:
       *       201:
       *         description: Currency created successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               id:
       *                type: integer
       *                description: The currency id.
       *                example: 1
       *               currencyName:
       *                 type: string
       *                 description: The currency's name.
       *                 example: TRY
       *               price:
       *                 type: array
       *                 description: price id
       *                 example: [1,2]
       */
      .post(this.currencyController.saveCurrency);

    app
      .route("/api/v1/currencies/:id")
      /**
       * @swagger
       * /api/v1/currencies/{id}:
       *   get:
       *     summary: Retrieve a single currency.
       *     description: Retrieve a single currency
       *     tags:
       *      - Currencies
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: A single currency.
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
       *                       description: The currency ID.
       *                       example: 0
       *                     currencyName:
       *                       type: string
       *                       description: The currency's name.
       *                       example: TRY
       */
      .get(this.currencyController.getCurrencyById)
      /**
       * @swagger
       * /api/v1/currencies/{id}:
       *   delete:
       *     summary: Currency a single category.
       *     description: Currency a single category
       *     tags:
       *      - Currencies
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       204:
       *        description: Currency deleted successfully
       */
      .delete(this.currencyController.deleteCurrency)

      /**
       * @swagger
       * /api/v1/currencies/{id}:
       *   put:
       *     summary: Update a Currency
       *     tags:
       *      - Currencies
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: Currency updated successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               categoryName:
       *                 type: string
       *                 description: The currency's name.
       *                 example: TRY
       */
      .put(this.currencyController.updateCurrency);

    app
      .route("/api/v1/prices")
      /**
       * @swagger
       * /api/v1/prices:
       *   get:
       *     summary: Retrieve a list of prices
       *     description: Retrieve a list of prices.
       *     tags:
       *      - Prices
       *     responses:
       *       200:
       *         description: A list of prices.
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
       *                       productId:
       *                         type: integer
       *                         description: The productId.
       *                         example: 1
       *                       currencyId:
       *                         type: integer
       *                         description: The currencyId.
       *                         example: 1
       *                       price:
       *                         type: integer
       *                         description: The price
       *                         example: 50
       *
       */
      .get(this.priceController.getPrices)

      /**
       * @swagger
       * /api/v1/prices:
       *   post:
       *     summary: Create a Price
       *     tags:
       *      - Prices
       *     responses:
       *       201:
       *         description: Price created successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               productId:
       *                type: integer
       *                description: The productId.
       *                example: 1
       *               currencyId:
       *                 type: integer
       *                 description: The currencyId.
       *                 example: 1
       *               price:
       *                 type: integer
       *                 description: Amount of price
       *                 example: 50
       */
      .post(tokenMiddleware, this.priceController.createPrice);

    app
      .route("/api/v1/prices/:id")
      /**
       * @swagger
       * /api/v1/prices/{id}:
       *   put:
       *     summary: Update a Price
       *     tags:
       *      - Prices
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: Currency updated successfully
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               price:
       *                 type: integer
       *                 description: Amount of price
       *                 example: 75
       *               currencyId:
       *                 type: integer
       *                 description: The currencyId.
       *                 example: 1
       *               productId:
       *                 type: integer
       *                 description: The productId.
       *                 example: 1
       */
      .put(this.priceController.updatePrice)
      /**
       * @swagger
       * /api/v1/prices/{id}:
       *   delete:
       *     summary: Delete price.
       *     description: Delete price
       *     tags:
       *      - Prices
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       204:
       *        description: Price deleted successfully
       */
      .delete(this.priceController.deletePrice)
      /**
       * @swagger
       * /api/v1/prices/{id}:
       *   get:
       *     summary: Retrieve a single price.
       *     description: Retrieve a single price
       *     tags:
       *      - Prices
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *     responses:
       *       200:
       *         description: A single price.
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
       *                       description: The price ID.
       *                       example: 0
       *                     price:
       *                       type: integer
       *                       description: Amount of price.
       *                       example: 50
       */
      .get(this.priceController.getPriceById);
  }
}

export { Routes };
