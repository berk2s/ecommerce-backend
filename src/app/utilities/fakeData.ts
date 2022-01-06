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
        // {
        //   id: i,
        //   categoryName: faker.commerce.department(),
        //   createdAt: new Date(),
        //   lastModifiedAt: new Date(),
        // },
      ],
      userRating: [],
      properties: [
        // {
        //   id: i,
        //   brand: "MSI",
        //   color: faker.commerce.color(),
        //   model: faker.commerce.productName(),
        //   memory: faker.commerce.productMaterial(),
        //   cpu: faker.commerce.productMaterial(),
        //   graphicCard: faker.commerce.productMaterial(),
        //   disk: faker.commerce.productMaterial(),
        //   mass: faker.commerce.productMaterial(),
        // },
      ],
      prices: [
        // {
        //   id: i,
        //   price: faker.commerce.price(),
        //   currencyId: i,
        //   productId: i,
        // },
      ],
    });
  }
}
