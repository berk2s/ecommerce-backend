import { getManager } from 'typeorm'
import { Category } from '../entity/Category'
import { Currency } from '../entity/Currency'
import { Price } from '../entity/Price'
import { Product } from '../entity/Product'
import { CreateProductDto, UpdateProductDto } from '../models/Product'

class ProductService {
  constructor() {}

  public async createProduct(createProductDto: CreateProductDto) {
    const manager = getManager()

    const product = new Product()
    product.productName = createProductDto.productName // sağdaki postmandan
    product.categories = []

    const categories = await manager.findByIds(Category, createProductDto.categories)

    categories.forEach((category) => {
      product.categories = [...product.categories, category]
    })

    const savedProduct = manager.save(product)

    return savedProduct
  }

  public async getProducts() {
    const manager = getManager()
    const products = await manager.find(Product)
    return products
  }

  public async getProduct(id: number) {
    const manager = getManager()
    const product = await manager.findOne(Product, id)
    return product
  }

  public async deleteProduct(id: number) {
    const manager = getManager()
    const product = await manager.findOne(Product, id)
    manager.remove(product)
  }

  public async updateProduct(id: number, productCategoryDto: UpdateProductDto) {
    const manager = getManager()
    const productToUpdate = await manager.findOne(Product, id)
    productToUpdate.productName = productCategoryDto.productName
    productToUpdate.description = productCategoryDto.description
    productToUpdate.status = productCategoryDto.status
    const updatedProduct = await manager.save(productToUpdate)
    return updatedProduct
  }
}

export { ProductService }
