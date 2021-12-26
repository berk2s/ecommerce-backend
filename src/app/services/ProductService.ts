import { getManager } from 'typeorm'
import { Category } from '../entity/Category'
import { Product } from '../entity/Product'
import { CreateProductDto } from '../models/Product'

class ProductService {
  constructor() {}

  public async createProduct(createProductDto: CreateProductDto) {
    const manager = getManager()

    const product = new Product()
    product.productName = createProductDto.productName
    product.categories = []

    const categories = await manager.findByIds(
      Category,
      createProductDto.categories,
    )

    categories.forEach((category) => {
      product.categories = [...product.categories, category]
    })

    manager.save(product)
  }
}

export { ProductService }
