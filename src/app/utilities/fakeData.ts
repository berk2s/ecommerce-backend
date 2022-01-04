import { getManager } from "typeorm";
import { Product } from "../entity/Product";
import faker from "faker";

export async function generateProducts() {
  const manager = getManager();
  for (let i = 0; i < 50; i++) {
    await manager.save(Product, {
      id: i,
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      status: "active",
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      categories: [
        {
          id: i,
          categoryName: faker.commerce.department(),
          createdAt: new Date(),
          lastModifiedAt: new Date(),
        },
      ],
      userRating: [],
      prices: [
        {
          id: i,
          price: faker.commerce.price(),
          currencyId: i,
          productId: i,
        },
      ],
    });
  }
}
