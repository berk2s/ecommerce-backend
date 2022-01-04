import { getManager } from "typeorm";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { CreateProductDto, UpdateProductDto } from "../models/Product";
import { Sort } from "../utilities/types";

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

  public async getProducts(searchTerm?: string, sort?: Sort, page?: number) {
    const manager = getManager();
    const pageNumber = parseInt(page as any) || 1;
    const PER_PAGE = 3;

    if (page) {
      const products = await manager
        .createQueryBuilder(Product, "product")
        .skip(PER_PAGE * (pageNumber - 1))
        .take(PER_PAGE)
        .getMany();
      return products;
    }

    if (searchTerm || sort) {
      const searchProducts = await getManager()
        .createQueryBuilder(Product, "product")
        .where("product.productName LIKE :productName", {
          productName: `${searchTerm}%`,
        })
        .orderBy("product.productName", sort)
        .getMany();

      return searchProducts;
    } else {
      const products = await manager.find(Product, {
        relations: ["categories", "prices", "userRating"],
      });
      return products;
    }
    // for (let i = 0; i < 50; i++) {
    //   await manager.save(Product, {
    //     id: i,
    //     productName: faker.commerce.productName(),
    //     description: faker.lorem.paragraph(),
    //     status: "active",
    //   });
    // }
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
