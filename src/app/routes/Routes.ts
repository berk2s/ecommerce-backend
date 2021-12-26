import { Request, Response, Application } from 'express'
import { ProductController } from '../controllers/ProductController'

class Routes {
  private productController: ProductController

  constructor() {
    this.productController = new ProductController()
  }

  public routes(app: Application): void {
    app.route('/').get((request: Request, response: Response) => {
      response.status(200).send({
        message: 'GET request successfully.',
      })
    })

    app.route('/products').post(this.productController.saveProduct)
  }
}

export { Routes }
