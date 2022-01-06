import { getManager } from "typeorm";
import { Product } from "../entity/Product";
import faker from "faker";

const imageURLs = [
  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469350/assets/MSI2_ll5c68.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469286/assets/MSI1_qbzsnv.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469285/assets/MSI3_gkrxzj.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469285/assets/MSI10_sbuyw7.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469284/assets/MSI5_jbmjya.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469284/assets/MSI9_fcjx4q.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469284/assets/MSI8_bysdtd.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469284/assets/MSI4_uead02.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469284/assets/MSI7_yyw0su.jpg",

  "https://res.cloudinary.com/djh0vlero/image/upload/v1641469284/assets/MSI6_uclcn4.jpg",
];

const randomImage = () => {
  return imageURLs[Math.floor(Math.random() * imageURLs.length)];
};

const isAvailable = () => {
  if (Math.random() >= 0.5) {
    return "available";
  } else {
    return "unavailable";
  }
};

export async function generateProducts() {
  const manager = getManager();
  for (let i = 0; i < 50; i++) {
    await manager.save(Product, {
      id: i,
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      status: isAvailable(),
      image: randomImage(),
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
