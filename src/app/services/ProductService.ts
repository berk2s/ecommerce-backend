import { getManager } from "typeorm";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { Property } from "../entity/Property";
import { CreateProductDto, UpdateProductDto } from "../models/Product";
import { generateProducts } from "../utilities/fakeData";

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
    product.image = createProductDto.image;

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

  public async getProducts(searchTerm?: string, page?: number, limit?: number) {
    const manager = getManager();
    const pageNumber = parseInt(page as any) || 1;
    const limitNumber = parseInt(limit as any) || 3;
    const PER_PAGE = 3;

    if (searchTerm) {
      const searchProducts = await getManager()
        .createQueryBuilder(Product, "product")
        .where("product.productName LIKE :productName", {
          productName: `${searchTerm}%`,
        })
        .getMany();

      return searchProducts;
    }
    if (page) {
      const paginationProducts = await manager
        .createQueryBuilder(Product, "product")
        .skip(PER_PAGE * (pageNumber - 1))
        .take(PER_PAGE)
        .getMany();
      return paginationProducts;
    }
    if (limit) {
      const limitedProducts = await manager
        .createQueryBuilder(Product, "product")
        .limit(limitNumber)
        .getMany();
      return limitedProducts;
    } else {
      const products = await manager.find(Product, {
        relations: ["categories", "prices", "userRating", "properties"],
      });
      return products;
    }
    // await generateProducts();
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

    if (
      productCategoryDto.categories &&
      Array.isArray(productCategoryDto.categories)
    ) {
      const categories = await manager.findByIds(
        Category,
        productCategoryDto.categories
      );
      productToUpdate.categories = categories;
    }

    if (
      productCategoryDto.properties &&
      Array.isArray(productCategoryDto.properties)
    ) {
      const properties = await manager.findByIds(
        Property,
        productCategoryDto.properties
      );
      productToUpdate.properties = properties;
    }

    const updatedProduct = await manager.save(productToUpdate);
    return updatedProduct;
  }
}

export { ProductService };
