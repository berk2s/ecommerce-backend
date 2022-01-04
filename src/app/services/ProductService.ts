import { getManager, Like } from "typeorm";
import { Category } from "../entity/Category";
import { Currency } from "../entity/Currency";
import { Price } from "../entity/Price";
import { Product } from "../entity/Product";
import { CreateProductDto, UpdateProductDto } from "../models/Product";

class ProductService {
  constructor() {}

  public async createProduct(createProductDto: CreateProductDto) {
    const manager = getManager();

    const product = new Product();
    product.productName = createProductDto.productName; // sağdaki postmandan
    product.categories = [];
    product.description = createProductDto.description;
    product.status = createProductDto.status;

    const categories = await manager.findByIds(
      Category,
      createProductDto.categories
    );

    categories.forEach((category) => {
      product.categories = [...product.categories, category];
    });

    const savedProduct = manager.save(product);

    return savedProduct;
  }

  public async getProducts(searchTerm?: string) {
    const manager = getManager();
    if (searchTerm) {
      const products = await manager.getRepository(Product).find({
        productName: Like(`${searchTerm}%`),
      });
      return products;
    } else {
      const products = await manager.find(Product);
      return products;
    }

    // const searchProducts = await manager
    //   .createQueryBuilder()
    //   .select()
    //   .from(Product, "product")
    //   .where("product.productName LIKE :productName", {
    //     productName: `${searchTerm}`,
    //   })
    //   .getMany();
  }

  public async getProduct(id: number) {
    const manager = getManager();
    const product = await manager.findOne(Product, id);
    return product;
  }

  public async deleteProduct(id: number) {
    const manager = getManager();
    const product = await manager.findOne(Product, id);
    if (product) {
      await manager.remove(product);
    }
    return product;
  }

  public async updateProduct(id: number, productCategoryDto: UpdateProductDto) {
    const manager = getManager();
    const productToUpdate = await manager.findOne(Product, id);
    if (!productToUpdate) {
      return { message: "There is no product with that id mate." };
    }
    productToUpdate.productName = productCategoryDto.productName;
    productToUpdate.description = productCategoryDto.description;
    productToUpdate.status = productCategoryDto.status;
    const updatedProduct = await manager.save(productToUpdate);
    return updatedProduct;
  }
}

export { ProductService };
