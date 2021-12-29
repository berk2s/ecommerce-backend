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
       * @openapi
       * /products:
       *  post:
       *    tags:
       *    - products
       *    summary: Create a new product
       *    description: Create new product
       *    parameters:
       *    - in: "body"
       *      name: "productName"
       *      description: "Name of the product"
       *      required: true
       *    - in: "body"
       *      name: "categories"
       *      description: "Category Id that the product belongs to"
       *      required: true
       *    - in: "body"
       *      name: "description"
       *      description: "Description of the product"
       *    - in: "body"
       *      name: "status"
       *      description: "Status of the product"
       *
       *    responses:
       *      '200':
       *        description: "Created Object"
       */
      .post(this.productController.saveProduct)
      .get(this.productController.getProducts);

    app
      .route("/products/:id")
      .get(this.productController.getProduct)
      .delete(this.productController.deleteProduct)
      .post(this.productController.updateProduct);

    app
      .route("/categories/:id")
      .get(this.categoryController.getCategoryById)
      .delete(this.categoryController.deleteCategory)
      .post(this.categoryController.updateCategory);

    app
      .route("/categories")
      .post(this.categoryController.saveCategory)
      .get(tokenMiddleware, this.categoryController.getCategories);

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
