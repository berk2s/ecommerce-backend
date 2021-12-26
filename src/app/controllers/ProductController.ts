import { Request, Response } from 'express'
import { CreateProductDto } from '../models/Product'
import { ProductService } from '../services/ProductService'

class ProductController {
  public async saveProduct(req: Request, res: Response) {
    const productService = new ProductService()

    const createProductDto: CreateProductDto = req.body

    await productService.createProduct(createProductDto)

    res.json({})
  }
}
export { ProductController }
